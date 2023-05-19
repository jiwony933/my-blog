---
title: '[React] input 여러 개일 때, 객체로 값 받기 (+구조분해할당)'
date: '2022-09-05'
category: ''
summary: '한 컴포넌트에 input 칸이 많을 떄, 하나하나 setState를 사용해서값을 저장하고 사용하다보면 코드가 길어지고....이럴 때에는요?'
---

한 컴포넌트에 input 칸이 많을 떄, 하나하나 setState를 사용해서  
값을 저장하고 사용하다보면 코드가 길어지고....

이럴 때에는 input 값을 모두 받는 객체를 만들어서 사용하면 아주 좋습니다!

> ## Before
>
> ```js
> // 함수 부분
>
> const [id, setId] = useState('');
> const [pw, setPw] = useState('');
> const saveUserId = (e) => {
>   setId(e.target.value);
> };
> const saveUserPw = (e) => {
>   setPw(e.target.value);
> };
>
> // * 그려지는 부분에 name 을 작성해야 한다.
> ```
>
> - 각각의 input value를 state로 만들고, 또 setState를 해주는 거의 똑같은 함수를 두 개나 만들어야 하기 때문에 비효율적으로 보임

> ## After
>
> 1. id와 password를 저장할 빈 객체를 state로 만들어 줍니다.
>
> ```js
> const userInfo = { id: '', pw: '' };
> ```
>
> 1-1) 그리고 객체 내에 들어갈 값은 각각  
> `[input의 name] : input의 value` 가 되겠지요?
>
> 2. `console.log(e.target)` 을 찍어보면 아래와 같이 나옵니다.
>
> ```js
> <input class='input' name='id' type='email' placeholder='이메일 입력' />
> ```
>
> 2-1) input의 name을 가져올거고, input에 입력한대로 value값이 생기겠지요?
>
> 3.
>
> ```js
> [e.target.name] : e.target.value
> ```
>
> 이렇게 써야할 것을 구조분해할당을 사용하여 아래와 같이 표현
>
> ```js
> const saveUserInput = (e) => {
>   const { value, name } = e.target;
> };
> ```
>
> > 이건 마치 props를 받아올 때에도 마찬가지로
> >
> > `(props)` 라고 쓰는 대신, `({id, item, content})` 이렇게 받아오는 것이 나중에 가독성이 좋은 것과 같은 이치

> ## 완성된 코드!!
>
> ```js
> // 함수 부분
>
> const [userInput, setUserInput] = useState({ id: '', password: '' });
>
> const saveUserInput = (e) => {
>   const { value, name } = e.target;
>   setUserInput({ ...userInput, [name]: value });
> };
> ```
