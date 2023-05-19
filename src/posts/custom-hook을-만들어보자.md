---
title: 'custom hook을 만들어보자'
date: '2022-12-03'
category: ''
summary: 'custom hook은 코드, 로직의 반복을 최소화 하고, 재사용성을 높이기 위해서 사용한다. 나도 만들어보자!'
---

### Why Custom Hooks?

컴포넌트를 만들다 보면 반복되는 로직이 자주 생긴다.  
예를 들면 클릭 했을 때 모달창이 오픈되거나, input값을 저장해서 사용하거나 등등..

custom hook은 코드, 로직의 반복을 최소화 하고, 재사용성을 높이기 위해서 사용한다.

### 우선 custom hooks를 만들기 위해서는

1.  src 디렉터리에 hooks라는 디렉터리를 만든다.
2.  파일명이 use로 시작하는 js/ts파일을 만든다.
3.  함수를 작성하고, 함수 안에서는 useState, useEffect, useRouter등 기존 Hooks를 사용하여 자유롭게 원하는 기능을 만든다.
4.  마지막에 return 값으로 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

### useShallowRoute 커스텀훅 만들어보기

필터를 클릭할 때마다 라우터 경로를 바꿔주는 코드를 작성하였는데,  
필터되는 항목이 많아 질 수록 event에 아래와 같은 행위를 반복하게 되었다.

```js
// input type Date가 바뀔 때 마다, query 변경
const handleDateChange = (e: ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    router.push(
      {
        pathname: '/order',
        query: { ...router.query, [name]: value },
      },
      undefined,
      { shallow: true }
    );
  };

// searchTerm을 submit 했을 때, query 변경
const submitSearchTerm = () => {
    router.push(
      {
        pathname: '/order',
        query: { ...router.query, searchTerm: searchTerm },
      },
      undefined,
      { shallow: true }
    );
  };

```

예시로 두개만 가져왔지만, 필터가 많아서 10개 넘게 반복해서 사용하고 있었다. 페이지가 늘어날 수록 훨씬 더 늘어났겠지..

이를 추상화 하기 위해 살펴보았을 때,  
useRouter을 사용한 router,`{ shallow : true }`는 계속해서 반복되고 있고 변화하는 부분은 pathname과 기존 쿼리에 추가될 key와 value 값이었다.

그래서 pathname과 { queryKey : queryValue } 형태의 object를 받아서 router.push, router. replace를 실행해주는 커스텀 훅을 제작해보았다.

```js
// useShallowRoute.ts

import { useRouter } from 'next/router';

export const useShallowRoute = () => {
  const router = useRouter();
  const replace = (pathname: string, queryOption: object) => {
    router.replace(
      {
        pathname,
        query: { ...router.query, ...queryOption },
      },
      undefined,
      { shallow: true }
    );
  };

  const push = (pathname: string, queryOption: object) => {
    router.push(
      {
        pathname,
        query: { ...router.query, ...queryOption },
      },
      undefined,
      { shallow: true }
    );
  };

  return { replace, push };
};
```

이렇게 hooks를 따로 만들어 두고, 사용하고 싶은 컴포넌트에서 import 해준 뒤, 사용해주면 된다!

```js
import { useShallowRoute } from 'hooks/useShallowRoute';

const { replace } = useShallowRoute();
```

위에서 길고 길게 매번 반복하며 작성했던 코드들을 2줄로 간단하게 작성할 수 있고, 코드의 가독성도 훨씬 좋아보인다!

```js
// Before
const submitSearchTerm = () => {
  router.push(
    {
      pathname: '/order',
      query: { ...router.query, searchTerm: searchTerm },
    },
    undefined,
    { shallow: true }
  );
};

// After
const handleSearchTermSubmit = () => {
  replace('/order', { searchTerm: searchTerm });
};
```

custom Hooks 어렵지만 재밌는 것 같다..  
다음에도 또 만들기 도전!
