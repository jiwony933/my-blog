---
title: '[React] 로그인/회원가입 기능 구현하기 (with Back-end)'
date: '2022-09-07'
category: ''
summary: '지금까지 만들었던 instagram 클론에 회원가입, 로그인 기능을 추가하였다. fetch도 사용하고~ 서버 통신도 하고~'
---

### 백엔드와의 첫 협업 !!! 회원가입, 로그인 기능 구현하기

> 지금까지 만들었던 instagram 클론에 회원가입, 로그인 기능을 추가하였다.
>
> **회원가입의 경우에는**  
> 이메일, 비밀번호를 입력하고 \[회원가입\] 버튼을 클릭하면 유저 DB에 추가 되고,  
> (method : POST 사용)
>
> **로그인의 경우에는**  
> 이메일, 비밀번호를 입력하고 \[로그인\] 버튼을 클릭하면, 유저 DB에서 가입되어 있는지 확인 한 후에 가입이 되어있으면 JWT(JSON Web Token)을 받아서 main page로 이동  
> (method : POST 사용)

![](https://velog.velcdn.com/images/jiwonyyy/post/78b5d318-8149-4b98-af87-04b6751d8bab/image.png)

> ### fetch 메서드
>
> - 통신에 사용하는 메서드
> - 클라이언트가 서버에 요청을 보내고, 응답을 받을 수 있는 메서드
>
> #### fetch 사용 방법
>
> ```js
> fetch('api주소', {
>   method: '...', // GET, POST, DELETE 등등
>   headers: { key: 'value' },
>   body: JSON.stringify({ key: 'value' }),
> }) //요청
>   .then((response) => response.json())
>   .then((data) => console.log(data));
> //응답
> ```

기존에 만들어두었던 login.js  
\[회원가입\] 버튼에 \[signUp\] 함수 추가  
\[로그인\] 버튼에 \[signIn\] 함수 추가

### 회원 가입

> ```js
> // sign up 회원 가입
> const signUp = (e) => {
>   e.preventDefault();
>   fetch('http://서버IP:3000/auth/signup', {
>     method: 'POST',
>     headers: { 'Content-Type': 'application/json;charset=utf-8' },
>     body: JSON.stringify({
>       email: userInput.email, // 백엔드에서 key를 뭐로 받는지 확인하고 작성
>       password: userInput.password,
>     }),
>   })
>     .then((res) => res.json())
>     .then((data) => console.log(data));
> };
> ```

### 로그인

> ```js
> // sign in 로그인
> const signIn = (e) => {
>   e.preventDefault();
>   fetch('http://서버IP:3000/auth/signin', {
>     method: 'POST',
>     headers: { 'Content-Type': 'application/json;charset=utf-8' },
>     body: JSON.stringify({
>       email: userInput.email,
>       password: userInput.password,
>     }),
>   })
>     .then((res) => res.json())
>     .then(
>       (data) =>
>         data.accessToken
>           ? (goToMain(),
>             window.localStorage.setItem('token', data.accessToken))
>           : // Token을 받았으면, 메인으로 이동 및 localStorage에 토큰 저장
>             alert('비밀번호가 잘못되었습니다!')
>       // Token이 없으면, 비밀번호가 잘못되었다고 알려주기
>     );
> };
> ```

### 오류 발생했던 경우

> 1. 백엔드에서 지정했던 비밀번호 조건과, 프론트엔드에서 버튼 활성화하는 비밀번호 조건이 달랐을 떄  
>    \-> 404 ERROR가 떴었음. 조건을 맞추니 해결됨 ㅎㅎ

> 2. body에서 보내는 내용의 key가 프론트엔드에서는 email, password 두가지 였고, 백엔드에서 받을 때는 name, profile_Image등이 더 있었는데 백엔드에서 받는 곳에(?) not null로 되어있으면 모든 key에 대한 정보를 다 줘야함.

### 느낀 점

> 1.  일단 너무 신기했다. (ㅋ) 내가 통신을?
> 2.  프로젝트를 진행할 때, 어떤 정보를 요청하고, 받을 것인지에 대한 구상을 명확하게 하고 시작해야 할 것!
