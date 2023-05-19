---
title: '재사용 가능한 검색창 컴포넌트 만들기 (custom hooks)'
date: '2022-12-31'
category: 'client'
summary: 'custom hook 만들기 2탄'
---

![](https://velog.velcdn.com/images/jiwonyyy/post/ef819e18-1e13-412a-9c3e-fe6eda3516fc/image.png)

admin 페이지에서는 거의 모든 페이지에서 "검색" 기능이 필요하다.

처음에는 모든 페이지에 아래와 같은 코드를 페이지 개수 만큼 반복하며,,, 코드를 무한 생성해내고 있다가 useShallowRoute라는 custom hook을 만든 후, 반복되는 코드들을 custom hooks로 바꾸어 보기로 하였다.

### 기존에 반복되던 코드

```js
// useState를 사용한 input 변화에 따른 검색어 상태 저장
const [searchTerm, setSearchTerm] = useState('');

// onChange 함수
const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  setSearchTerm(value);
};

// onSubmit 함수
const handleSearchTermSubmit = () => {
  replace('/order', { searchTerm: searchTerm });
};

// 검색어 초기화 함수 (x버튼 클릭 시)
const handleSearchTermRemove = () => {
  setSearchTerm('');
};
```

반복되는 코드를 살펴 보면  
useState를 통한 검색어 상태 관리가 여러 함수로 반복되고 있다.

그래서 이것을 useSearch로 바꾸어 보자!

useHooks를 사용하는 간단한 방법은 이전 포스팅에 써놨다 ㅎㅎ  
[https://velog.io/@jiwonyyy/custom-hook을-만들어보자](https://velog.io/@jiwonyyy/custom-hook%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)

### custom hook 만들기 : `useSearch`

```js
import { useShallowRoute } from 'hooks/useShallowRoute';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] =
    useState <
    string >
    (router.query.searchTerm ? router.query.searchTerm.toString() : '');
  const { replace } = useShallowRoute();

  const changeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const submitSearchTerm = (routingPage: string) => {
    replace(routingPage, { searchTerm: searchTerm });
  };

  const removeSearchTerm = () => {
    setSearchTerm('');
  };

  return {
    changeSearchTerm,
    submitSearchTerm,
    searchTerm,
    setSearchTerm,
    removeSearchTerm,
  };
};
```

custom Hook을 만들어 두고 검색창이 필요한 페이지마다 useSearch를 불러와서 사용을 하면, 페이지마다 state값과 함수를 정의하지 않아도 간단하게 사용이 가능하다.

위의 저 3가지 함수 정의 + useState 정의를 할 필요 없이 단 한줄로

```js
const { changeSearchTerm, submitSearchTerm, searchTerm, removeSearchTerm } =
  useSearch();
```

필요한 페이지마다 useSearch를 불러와서  
기존의 search box 컴포넌트에 있는 함수를 아래와 같이 바꾸며 만족을 느끼던 중..

```js
<SearchBox
  onChange={changeSearchTerm}
  onSubmit={() => submitSearchTerm(routingPage)}
  searchTerm={searchTerm}
  removeSearchTerm={removeSearchTerm} // 박스 내 X버튼
  placeholder={'주문번호, 상품명, 구매자명, 전화번호'}
/>
```

_**어??**_

searchBox 안의 onChange, onSubmit, searchTerm, removeSearchTerm 또한 같은 코드가 반복된다는 것이 보이게 되었다.

```js
      onChange={changeSearchTerm}
      onSubmit={() => submitSearchTerm(routingPage)}
      searchTerm={searchTerm}
      removeSearchTerm={removeSearchTerm}
```

_그래서 아예 searchBox 컴포넌트 안에서 useSearch 훅을 불러오고,  
이 컴포넌트만 재활용을 하게 되면 검색창이 필요한 페이지 마다 useSearch 마저도 불러오지 않아도 될 것이다.  
_

SearchBox 컴포넌트 routingPage와 placeHolder만 props로 전달주면  
나머지 함수들은 searchBox 컴포넌트 안에서 불러와진다.

### 최종적으로 완성한 검색창 컴포넌트

```js
import { useSearch } from 'hooks/useSearch';
import { FlexBox } from 'styles/common';
import CloseIcon from 'assets/icons/CloseIcon';
import SearchIcon from 'assets/icons/SearchIcon';
import {
  DeleteSearchTermButton,
  SearchForm,
  SearchTermInput,
} from './SearchBox.styles';

interface P {
  routingPage: string;
  placeholder: string;
}

const SearchBox = ({ routingPage, placeholder }: P) => {
  const { changeSearchTerm, submitSearchTerm, searchTerm, removeSearchTerm } =
    useSearch();

  return (
    <SearchForm onSubmit={() => submitSearchTerm(routingPage)}>
      <SearchIcon fill='var(--grey500)' />
      <SearchTermInput
        id='searchTerm'
        placeholder={placeholder}
        onChange={changeSearchTerm}
        value={searchTerm}
        onSubmit={submitSearchTerm}
      />
      {searchTerm !== '' && (
        <DeleteSearchTermButton onClick={removeSearchTerm}>
          <CloseIcon fill='white' width={16} height={16} />
        </DeleteSearchTermButton>
      )}
    </SearchForm>
  );
};

export default SearchBox;
```

그리고 검색창이 필요한 어떤 곳이든

```js
<SearchBox
  routingPage={routingPage} // 검색어 submit시 라우팅될 주소
  placeholder={'주문번호, 상품명, 구매자명, 전화번호'}
/>
```

이 세줄만 작성해주면, onChange, onSubmit, 검색어 초기화 3가지 기능이 모두 탑재된 검색창 생성 가능!

![](https://velog.velcdn.com/images/jiwonyyy/post/5b1c093c-b973-48a4-8998-6246b988e625/image.png)
