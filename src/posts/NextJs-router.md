---
title: 'NextJs router.query가 undefined일 때..'
date: '2023-02-11'
category: ''
summary: 'router.query가 왜 undefined죠.. 저 query에 있는 데이터 써야하는데요..!!!'
---

상품 상세페이지에서, `이 상품에 하위상품 등록하기` 버튼을 눌렀을 때에  
기존에 만들어 두었던 하위상품 생성 페이지에서 상위 상품의 id를 입력하는 칸에  
상위 상품 id data가 preset될 수 있는 기능을 만들고자 하였다.

```js
<MenuButton
  onClick={() => {
    push(`/product/sku/create`, { pvId: pvId });
  }}
>
  복사하여 신규 SKU 등록
  <CopyIcon width={16} height={16} fill='var(--grey800)' />
</MenuButton>
```

이렇게 이동한 `/product/sku/create`페이지에서

```js
const router = useRouter();
```

라우터를 불러오고,  
내가 원하는 input창에 value로 router.query.copyId를 줬더니..  
값이 불러와지지 않는 것이었다..!

이유를 찾아보니

> 이는 정적으로 최적화 된 페이지는 제공되는 route 매개 변수가 없이 렌더링되기 때문이다. Next.js는 렌더링된 후 쿼리 객체를 채운다.

그렇기 때문에 초기 렌더링 때에는 router.query가 빈 객체로 나오고,  
당연히 내가 원하는 input의 value는 빈값으로 들어가게 된다.

그렇다면 어떻게 문제를 해결해야할까?

2가지 방법을 찾았다..

### 1\. router.isReady 메서드 사용하기

`router.isReady`는 라우터 필드가 클라이언트 측에서 업데이트되고 사용할 준비가 되었는지 여부를 확인하는 메서드이다.

이 방법은 Next.Js@10.0.5이후에 추가된 기능이라고 한다.

```ts
useEffect(() => {
  if (!router.isReady) return;
  router.query.pvId &&
    setSkuInfo({ ...skuInfo, productVariationId: Number(router.query.pvId) });
}, [router.isReady]);
```

위와 같은 useEffect를 추가해두면, router가 준비되었을 때에 다시 skuInfo를 업데이트 해주어서, input창에 원하는 값을 넣을 수 있다.

### 2\. getServerSideProps 이용하기

serverSideProps에서 context로 전달된 query를 컴포넌트에 넘겨주어 사용하기

context 안에는 아래와 같은 정보들이 담겨있다.

```js
type Context = {
  req: IncomingMessage, // http 요청
  res: ServerResponse, // http 응답
  pathname: string, // url 경로
  query: ParsedUrlQuery, // 쿼리문자열
  asPath: string, // 쿼리 문자열 포함한 요청 경로
  AppTree: React.ComponentType, // next js 루트 구성요소
};
```

이 중에서 query 정보를 props로 넘겨주면, isReady 메서드 없이 상위 상품의 id를 바로 불러올 수 있다

```ts
const SkuCreatePage = ({ pvId }: P) => {
  return <CreateSku pvId={pvId} />;
};

export default SkuCreatePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { pvId } = query;
  return { props: { pvId } };
};
```

컴포넌트가 렌더링 될 때에 router.query를 바로 받아올 수 있는 방법을 2가지나 알게되었으니,,

이제 쿼리를 사용하여 여러가지 데이터를 넘기고 사용하는 방법을 좀더 활용해서 기능을 구현해보도록 해야겠다~~
