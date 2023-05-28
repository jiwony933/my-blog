---
title: '[코드 리팩토링] 하위 컴포넌트의 router에 대한 종속성 없애기'
date: '2023-04-22'
category: 'client'
summary: '코드 리팩토링 포스팅! 하위 컴포넌트의 역할에 대해서 생각해보자'
---

## 개요

#### 컴포넌트 대략 설명

![](https://velog.velcdn.com/images/jiwonyyy/post/05adbce4-14e2-4a85-b085-15006c1e155c/image.png)

- 토글 형태의 필터로, 필터를 클릭하면 queryUrl이 true/false로 바뀌며 새로운 데이터가 fetching됨

## 리팩토링 전

### 컴포넌트 부분

```ts
  <NoSupplierSkuFilter
    initialState={router.query.hasNoSupplier === 'true'}
  />
  <MinShippingPeriodZeroSkuFilter
    initialState={router.query.isMinShippingPeriodZero === 'true'}
  />
```

```ts
const NoSupplierSkuFilter = ({ initialState }: P) => {
  const [isFiltered, setIsFiltered] = useState<boolean>(initialState);
  const { replace } = useShallowRoute();
  const router = useRouter();

  const handleToggleClick = () => {
    replace('/product/sku', { hasNoSupplier: isFiltered ? false : true });
    setIsFiltered(isFiltered ? false : true);
  };

  useEffect(
    () => setIsFiltered(router.query.hasNoSupplier === 'true'),
    [router.query]
  );

  return (
    <AbnormalFilter isFiltered={isFiltered} toggleSelect={handleToggleClick}>
      매입처 정보가 없는 SKU 모아보기
    </AbnormalFilter>
  );
};

export default NoSupplierSkuFilter;
```

### 무엇이 문젤까!

우선 코드 리뷰 내용을 받은 내용은 다음과 같다..  
![](https://velog.velcdn.com/images/jiwonyyy/post/a7bf0d53-0003-4def-9cd6-2a6f2c4ebd8a/image.png)

- 내가 처음에 만든 필터 컴포넌트는 initialState를 props로 받는데

  - initialState를 내려줄때 props로 router.query에 대한 true/false를 판단해서 그 값을 전달함
  - filter 컴포넌트에서도, useEffect를 사용할 때, 의존성 배열에 router.query를 사용함

- 하위 컴포넌트가 router.query에 의존하게 되면, 그 컴포넌트는 라우터의 쿼리 파라미터에 의존성을 가지게 된다.
- 이렇게 되면 해당 컴포넌트를 사용하는 모든 곳에서 라우터의 쿼리 파라미터를 전달하거나, 같은 쿼리 파라미터를 가진 페이지에서만 사용할 수 있다는 제약이 생긴다.

이 말은 즉슨, 기존에 사용한 코드가 객체 지향 설계인 SOLID 원칙에 위배된다는 것이다!

> #### 1\. DIP (Dependency Inversion Principle) 원칙
>
> 높은 수준의 모듈이 낮은 수준의 모듈에 의존해서는 안 된다. 즉, 하위 컴포넌트는 라우터와 같은 상위 모듈에 직접 의존하면 안 되며, 대신 부모 컴포넌트와 같은 상위 모듈이 하위 컴포넌트의 의존성을 관리해야 한다.
>
> #### 2\. SRP(Single Responsibility Principle) 원칙
>
> 하나의 컴포넌트는 하나의 책임만 가지도록 만드는 것을 강조한다.  
> 내가 만든 필터(하위 컴포넌트)는 UI 구성 요소를 렌더링하고 이벤트 처리를 수행하는 것이 그냥 단순한 책임이고, 이 이벤트에 필요한 데이터는 상위 모듈에서 제공하여, 하위 컴포넌트는 자신이 담당하는 책임에만 집중하는 것이 좋다.

## 리팩토링 후

```js
const SkuPage = ({}: P) => {
  const router = useRouter();
  const { data, isLoading } = useSkus(router.query);

  const hasStocksFiltered = router.query.hasStocks === 'true';
  const hasNoSupplierFiltered = router.query.hasNoSupplier === 'true';
  const isMinShippingPeriodZeroFiltered =
    router.query.isMinShippingPeriodZero === 'true';

  if (isLoading) return <Loading />;
  if (!data) return <></>;

  return (
    <SkuList
      data={data}
      hasStocksFiltered={hasStocksFiltered}
      hasNoSupplierFiltered={hasNoSupplierFiltered}
      isMinShippingPeriodZeroFiltered={isMinShippingPeriodZeroFiltered}
    />
  );
};

export default SkuPage;
```

- router.query에 대한 핸들링을 최상단 페이지에서만 하고, true/false 값만 컴포넌트로 내려준다

```js
<NoSupplierSkuFilter initialState={hasNoSupplierFiltered} />
```

- 컴포넌트에는 page에서 받아온 데이터만 props로 전달함

```js
const NoSupplierSkuFilter = ({ initialState }: P) => {
  const [isFiltered, setIsFiltered] = useState < boolean > initialState;
  const { replace } = useShallowRoute();

  const handleToggleClick = () => {
    replace('/product/sku', { hasNoSupplier: !isFiltered });
    setIsFiltered(!isFiltered);
  };

  useEffect(() => setIsFiltered(initialState), [initialState]);

  return (
    <ProductToggleFilter
      isFiltered={isFiltered}
      toggleSelect={handleToggleClick}
    >
      매입처 정보가 없는 SKU 모아보기
    </ProductToggleFilter>
  );
};

export default NoSupplierSkuFilter;
```

- router.query에 대한 의존을 갖지 말고, initial State에 대한 의존만 갖는다.
- 리팩토링하면서 setState도 덤으로 아래와 같이 수정

```js
/// before
setIsFiltered(isFiltered ? false : true);

/// after
setIsFiltered(!isFiltered);
```

- 코드를 잘 쓰는 사람은 그냥 코드를 이상하게 쓰는게 더 힘들다.. 는 말을 들었는데  
  리팩토링 할 필요 없는 코드를 만들 수 있는 그날까지!!!!!!!!
