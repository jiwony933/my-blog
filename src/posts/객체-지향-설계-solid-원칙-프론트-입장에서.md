---
title: '객체 지향 설계 SOLID 원칙 (프론트의 입장에서)'
date: '2023-05-26'
category: 'client'
summary: '포스팅도 리팩토링이 필요합니다. (2023년 1월 7일에 썼던 글 업데이트 해보기)'
---

마음의 짐처럼 남아있던 예전에 썼던 SOLID 관련 글을 리팩토링 해보고자 합니다.

https://velog.io/@jiwonyyy/객체-지향-설계-SOLID-원칙-react의-입장에서

나름 좋아요도 12개 받았던 글인데...
지금 생각해보면 너무 빈약하고, 코드 예시도 없어서 마음먹고 보충할건 보충하고, 놔둘건 놔두고 놔두고,, 지울건 지우는 리팩토링을 해보았습니다

---

### SOLID 원칙

> 1.  SRP(단일 책임 원칙)
> 2.  OCP(개방-폐쇄 원칙)
> 3.  LSP(리스코프 치환 원칙)
> 4.  ISP(인터페이스 분리 원칙)
> 5.  DIP(의존 역전 원칙)

SOLID 원칙에 기반한 개발을 하게 되면,
프로그램의 유지보수가 편해지고, 프로그램 확장성을 높일 수 있다.

특히 프론트의 경우에는 코드 변경될 일이 매우 많기 때문에, 코드를 수정했을 때에 기존의 코드를 읽기 쉽고 변경하기 쉽게 작성하는 것이 매우 중요하다.

각각의 원칙에 대해서 알아보자 (프론트 기반으로 작성하였음)

# 1. SRP 단일 책임 원칙

> #### Single Responsibility Principle
>
> 어떤 클래스를 변경해야 하는 이유는 오직 하나뿐이어야 한다.

모든 함수, 컴포넌트 등은 정확히 한 가지 작업을 수행해야 한다.

## React에 적용 가능한 방향

### 1. 컴포넌트를 분리하기

- 이 내용은 웹페이지의 사용성과도 관련이 있다.

#### 위반 사례 적발..!

예를 들어서, PvList를 렌더링하는 page가 있다.

```js
const PvPage = () => {
  const router = useRouter();
  const { data, isLoading } = usePvs(router.query);

  if (isLoading) return <Loading />;
  if (!data) return <></>;

  return <PvList data={data} />;
};
```

그런데 PvList가 생각보다 뚱뚱한 컴포넌트였던 것이다.
SearchBox도 불러오고, BrandFilter도 불러오고, CategoryFilter도 불러오니 말이다.

```js
const PvList = ({ data }: P) => {
  return (
    <FlexColumnBox gap={16}>
      <ContentTitle>PV 목록 조회</ContentTitle>
      <SearchBox />
      <BrandFilter />
      <CategoryFilter />
      <Pagination
        currentPage={data.paging.currentPage}
        totalPage={data.paging.totalPage}
        onPageChange={handlePageChange}
      />
      <PvListTable pvs={data.pvs} />
    </FlexColumnBox>
  );
};
```

하지만, fetching된 데이터를 사용하는 곳은 pagination과 pvListTable뿐인데
데이터가 다 받아와지기 까지는 page에는 필터나 검색창이 뜨지 않고 Loading 스피너만 돌아갈 뿐이다...  
PvList라는 컴포넌트가 아주 많은 역할을 하는데 그것이 하나의 책임을 갖지 않고,
여기서는 data를 사용하는 컴포넌트와, data를 사용하지 않는 컴포넌트의 역할 분리가 필요하다.

아래와 같이 개선해볼 수 있다.
우선 Page에서는 data를 fetching해오지 않고, page는 단순히 컴포넌트를 렌더링하는 역할만 준다.

```js
const PvList = ({}: P) => {
  return (
    <FlexColumnBox gap={16}>
      <SearchBox />
      <Filters />
      <PaginationAndPvList />
    </FlexColumnBox>
  );
};

export default PvList;
```

그리고 데이터를 받아와서 사용해야하는 paginationAndPvLis컴포넌트에서 데이터를 불러온다.

```js
const PaginationAndPvList = ({}: P) => {
  const router = useRouter();
  const { data } = usePvs(router.query);
  const handlePageChange = () => {};

  if (!data) return <Loading />;

  const {
    paging: { totalPage, currentPage },
    pvs,
  } = data;

  return (
    <FlexColumnBox>
      <FlexBox gap={20}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </FlexBox>
      <PvListTable pvs={pvs} />
    </FlexColumnBox>
  );
};

export default PaginationAndPvList;
```

이렇게 개선하고 나면, 사용자가 상품리스트를 볼 때까지 그 무엇도 뜨지 않는 흰 화면만 바라보며 기다리는 시간을 줄일 수 있다.

또한 코드의 유연성 측면에서도 각 컴포넌트가 독립적으로 동작하게 바뀌어, 문제가 발생하여도 서로의 기능에 영향을 주지 않는다.

### 2. 주요 컴포넌트 기능과 관련 없는 함수는 별도의 utils로 추출

- 컴포넌트의 주요 기능과 관련은 없지만, 컴포넌트 내에 사용되기는 하는 함수들은 utils.ts 파일로 분리해두는 것이 좋다.
- 이는 가독성 뿐만 아니라, 자주 사용하는 함수일 경우에는 다른 컴포넌트에서 재사용하기에도 아주 편리하다.

> ### 나의 utils 폴더에 있는 함수들을 보면 이런 것들이 많다
>
> - 날짜, 숫자 등을 formatting 하는 함수
> - 유효성 검사를 하는 함수 (isEmptyArray ? 등)
> - 특정 라이브러리를 사용해서 data를 return 하는 함수도 포함될 수 있다

### 3. 로직을 custom hook 등으로 캡슐화 시키기

- 2번에서 좀 더 발전한 형태가 custom Hook이 아닐까 싶다.
- custom hook을 사용하여 로직을 캡슐화 하면, 그 로직은 그 행위가 필요로 하는 어떤 컴포넌트에서도 사용이 가능하다.

예를들어 useToggle이라는 커스텀 훅이 있다고 하면,

```js
import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);

  return { state, setState, toggle };
};
```

useToggle은 사용되는 컴포넌트가 어디인지는 상관 없다.
그냥 상태를 true/false로만 바꾸는 책임만 가질 뿐 그 이상도 그이하도 아니다!
customHook을 사용하는 것은 SRP원칙에도 해당되지만 이어서 나오는 OCP 원칙에도 해당된다.

# 2. OCP 개방-폐쇄 원칙

> #### Open/Closed Principle
>
> 소프트웨어 요소는 확장에는 열려있으나, 변경에는 닫혀있어야 한다.

원본 소스 코드를 변경하지 않고 확장할 수 있는 방식으로 컴포넌트를 구조화 하는 것이 좋다.
조건에 의해 컴포넌트의 내부 로직이 계속해서 변경된다면 위험할 수 있다.

#### 위반 사례 적발...!

부끄럽지만 내가 작성한 아주 안좋은 코드의 예시..

![](https://velog.velcdn.com/images/jiwonyyy/post/70c24828-a2a8-440c-b9f3-44ced6626261/image.png)

대략적인 설명을 하자면,
additional info를 하나의 객체로 관리하기 위해서 여러개의 input 창에 동일한 handleAdditionalInfoChange라는 함수를 쓰고 싶었고,
mileage, amount의 경우에는 number형태로 저장되어야 되기 때문에 함수 안에 직접 조건을 넣어주는 끔찍한 코드를 작성 했는데..

그렇다면, 숫자로 변환되어야 하는 price라는 nubmer를 받는 input창이 또 추가되면 나는 저 함수를 직접 수정해야하는 문제가 발생한다.

이를 custom Hooks로 빼보도록 하자

#### 만들었던 useInputs 커스텀훅

- initial Inputs를 넣으면 자동으로 타입에 맞게 데이터를 포매팅 해주는 커스텀 훅이다.
- 이 코드를 사용하면 이 커스텀훅을 불러오는 어디서든지 타입에 따라 formatting을 해줄 수 있다.

```js
import { useState } from 'react';

export function useInputs<T>(initialInputs: T) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setInputs({ ...inputs, [name]: Number(value) });
      return;
    }
    setInputs({ ...inputs, [name]: value });
  };

  const resetInputs = () => {
    setInputs(initialInputs);
  };

  return {
    inputs,
    setInputs,
    resetInputs,
    handleChange,
  };
}
```

하지만, 이 코드를 gpt한테 OCP가 맞냐고 물었더니, 이것도 아니란다!
![](https://velog.velcdn.com/images/jiwonyyy/post/9475e13d-9edb-4003-818d-a46813cacab0/image.png)

듣고 보니 하나하나 맞는말이다..
타입이 추가될 때마다 custom Hook의 주요 로직의 내부 조건문을 변경해야하는 상황이 발생하는 것이다..! 그래서 그것 마저 분리해버리기

```js
import { useState } from 'react';

export function useInputs<T>(initialInputs: T) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const convertedValue = convertValue(value, type);

    setInputs({ ...inputs, [name]: convertedValue });
  };

  const resetInputs = () => {
    setInputs(initialInputs);
  };

  return {
    inputs,
    setInputs,
    resetInputs,
    handleChange,
  };
}

const convertValue = (value: string, type: string) => {
  if (type === 'number') {
    return Number(value);
  }
  return value;
};
```

이렇게 되면, 타입 변환 로직을 외부에서 처리하고, 변환 함수를 변경하거나 추가하는 경우 기존 커스텀 훅을 수정할 필요가 없다!

# 3. LSP 리스코프 치환 원칙

> #### Liskov Substitution Principle
>
> 프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서, 하위 타입 인스턴스로 변경할 수 있어야 한다.

리스코프 치환의 원칙은 과연 리액트에서 어떻게 적용될까?
사실 처음 solid관련 글을 썼을때에는 리스코프 치환의 원칙은 react에서 적용될만한 경우가 별로 없다.. 라는 무식한 글을 썼다! ㅋ

하지만..! 리스코프 치환의 원칙은 타입스크립트에서 공용 컴포넌트를 사용할 때 적용될 수 있다.

서브타입(subtype)을 언제나 슈퍼타입(supertype)으로 대체할 수 있어야 한다!

Next.js에서 사용하는 Image 컴포넌트를 확장한 CustomImage 컴포넌트를 살펴보자

```js
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const CustomImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      {...props}
      layout='fill'
      src={src}
      placeholder='blur'
      blurDataURL='/image-assets/no-image.png'
    />
  );
};

export default CustomImage;
```

이 컴포넌트의 Type을 살펴보면, CustomImage 컴포넌트는 ImageProps 타입을 사용하여 props를 입력 받는다.

이렇게 전달하면, CustomImage는 next/Image가 갖는 모든 속성을 전달받을 수 있게 된다. 그래서 CustomImage를 사용하는 곳에서 next/Image를 사용하는 방식으로 변경하여도 동작에 문제가 생기지 않는 다는 것이다!

만약에 ImageProps로 주지 않고 layout, src 등등 필요하다고 생각하는 프로퍼티에 대한 타입만 전달했다면? 추후에 Image로 바꿔야하는 일이 생겼을 때 width나 height를 props로 전달했을 때 동작에 문제가 생길 수 있다.

이것이 바로 서브타입을 슈퍼타입으로 대체할 수 있어야 한다는 리스코프 치환 원칙을 적용한 사례이다.

# 4. ISP 인터페이스 분리 원칙

> #### Interface Segregation Principle
>
> 범용 인터페이스 하나 보다, 인터페이스를 분리하는 것이 낫다.

컴포넌트는 자신이 사용하지 않는 data나 메서드에 의존하지 않아야 한다.

인터페이스를 적절히 분리하게 되면, 한 컴포넌트에 생긴 문제가 다른 컴포넌트에 미치는 문제도 막을 수 있다.

리액트에서는 Props 분리를 하는 것을 예시로 들 수 있겠다.

```js
// before

   <h2>주문정보</h2>
     <RecipientInfo orderItems={orders} />
     <OrderInfo orderItems={orders} />
```

컴포넌트 이름만 딱 봐도 하나는 배송지에 대한 정보이고, 하나는 주문에 대한 정보인데 둘다 order를 props로 전달하고 있다.

```js
// after

   <h2>주문정보</h2>
   <RecipientInfo
     recipientName={order.recipientName}
     recipientPhoneNumber={order.recipientPhoneNumber}
   />
   <OrderInfo
     createdAt={order.createdAt}
     amount={order.amount}
     usedMileage={order.usedMileage}
   />
```

각각의 컴포넌트에서 실제로 사용할 정보만 분리하여 props로 전달해주는 것이 훨씬 바람직하다. 그리고 상위 컴포넌트에서 코드를 읽을 때에도 각각의 컴포넌트가 어떤 정보를 받아서 그려지는 내용인지에 유추하기에도 훨씬 좋다(가독성 up)

# 5. DIP 의존성 역전 원칙

> #### Dependency Inversion Principle
>
> 추상화된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화된 것에 의존해야 한다.

한 컴포넌트가 다른 컴포넌트에 직접적으로 의존해서는 안 되며, 둘 다 공통된 추상화에 의존해야 한다. 특히 고수준의 모듈은 저수준의 모듈에 의존해서는 안된다.

### 컴포넌트가 api 모듈 등에 직접적으로 의존하지 않고, 주입 받아서 사용하기

- 의존성의 생성과 관리는 외부에서 담당하고, 컴포넌트는 의존성에 대한 세부 구현을 알지 못하고 사용한다.

useSku라는 함수를 살펴보자.

```js
import api from 'api';
import { queryKeys } from 'constants/queryKeys';
import { useQuery } from 'react-query';
import { Sku } from 'types/product';

const getSku = async (skuId: number | undefined) => {
  if (!skuId) return;
  const { data } = (await api.get) < Sku > `/api/admin/skus/${skuId}`;
  return data;
};

export const useSku = (skuId: number | undefined) => {
  return useQuery([queryKeys.sku, skuId], () => getSku(skuId));
};
```

여기서 고수준의 모듈은 api 모듈 자체이고,
저수준의 모듈은 api모듈에 endpoint를 넘겨주어, 데이터를 받아오는 useSku이다.
useSku 함수는 추상화된 api 모듈을 외부에서 주입받아서 사용하고 있다.

고수준과 저수준을 이해해보고자 하면, 좀 더 변하기 쉬운것 == 저수준 이라고 생각하면 이해가 좀 더 쉽다고 생각한다.

추가로 관련해서 썼었던 포스트 글도 함께 첨부해본다
https://velog.io/@jiwonyyy/코드-리팩토링-하위-컴포넌트의-router에-대한-종속성-없애기

요약하자면,

- DIP 원칙을 따르기 위해 하위 컴포넌트에서 라우터의 쿼리 파라미터에 의존하지 않고, 최상위 페이지 컴포넌트에서 처리하도록 변경
- 하위 컴포넌트는 상위 모듈에서 필요한 데이터를 props로 전달받아 사용하도록 변경

마지막으로 리액트 공식문서를 읽다가 마지막 부분이 인상깊어서 캡처하여 첨부해본다..
![](https://velog.velcdn.com/images/jiwonyyy/post/f7e49f45-28f6-454a-a901-cee0938d49a6/image.png)

코드는 사실 쓸 일 보다 읽을 일이 많다는 사실!
그리고 내가 지금 그냥 넘어가는 내 스스로도 불편한 코드들이.. 나중에는 snow ball처럼 나한테 굴러오지 않도록 항상 원칙에 의거한 코드를 작성해야겠다~ 라고 다짐!!

> ### Reference

- https://medium.com/dailyjs/applying-solid-principles-in-react-14905d9c5377
  https://ko.reactjs.org/docs/thinking-in-react.html
- 그리고 나의 이상했던 코드들..
