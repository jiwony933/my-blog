---
title: 'config 파일로 서버주소 손쉽게 관리하기!'
date: '2022-10-02'
category: ''
summary: 'config 파일을 만들어서 서버 주소를 한곳에서 관리하면, 파일을 만드는데의 귀찮음이 1이면 행복이 10으로 돌아옵니다..'
---

백엔드와 통신할 때에 서버가 통합되기 전까지는 fetch문 내의 서버 주소를 매번 바꾸어 가며 통신을 했다.

매번 아이피 주소 물어보고, 엔드포인트 물어보고... 언제까지 그렇게 할거냐고...!!

config 파일을 만들어서 한번에 관리하면, 파일을 만드는데의 귀찮음이 1이라고 하면, 10만큼의 행복이 돌아온답니다.

### 1) config.js 파일을 만들어서, BASE_URL과 엔드포인트 작성하기

파일 위치는 index.js파일과 동일한 위치에 하면 됨

```js
//config.js

const BASE_URL = 'http://서버주소:포트번호';

// 객체 형태로 만들어 주면 됨

const API = {
  signup: `${BASE_URL}/user/signup`,
  login: `${BASE_URL}/user/signin`,
  adminPage: `${BASE_URL}/user/admin`,
  reviewWrite: `${BASE_URL}/review/new`,
  detail: `${BASE_URL}/detail`,
  adminEdit: `${BASE_URL}/store`,
  resultList: `${BASE_URL}/main/search`,
  profile: `${BASE_URL}/user/profile`,
};
export default API;
```

### 2) 서버 주소가 필요한 파일에서 import 해주기

```js
import API from '../../../config';
```

### 3) 필요한 곳에서 백틱과 함께 써버리기

```js
useEffect(() => {
  fetch(`${API.adminEdit}/${storeId.id}`, {
    method: 'GET',
    headers: {
      authorization: accessToken,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then((res) => res.json())
    .then((result) => (setInput(result), setMenus(result.food_menu)));
}, []);
```

코드를 치는게 어느정도 익숙해진 뒤에는  
좀 더 깔끔하게 코드를 짜는 방법, 그리고 유지 보수가 편리한 방법을 익혀나가야 할 것이다..!
