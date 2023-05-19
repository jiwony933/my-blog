---
title: '[React] 인스타그램 로그인창 구현하기 (useState, useNavigate)'
date: '2022-08-31'
category: 'client'
summary: '조건 만족 시, 로그인 버튼 활성화 + 버튼 클릭 시 다른 페이지 이동'
---

![](https://velog.velcdn.com/images/jiwonyyy/post/8eb3ba5e-c1b1-4b02-a979-ac980263c6f2/image.png)

## 구현 기능

> 1.  조건을 만족하는 ID와 PW 입력 시, 로그인 버튼 활성화  
>     ID에 '@' 문자 포함, PW는 5글자 이상
> 2.  활성화된 로그인 버튼 클릭 시, 메인 페이지로 이동  
>     /main으로 이동

## 구현 내용

> 1.  조건을 만족하는 ID와 PW 입력 시, 로그인 버튼 활성화  
>     ID에 '@' 문자 포함, PW는 5글자 이상

```js

// 컴포넌트 내용

 <form className="loginBox">
       <input
        type="email"
        placeholder="전화번호, 사용자 이름 또는 이메일"
        onChange={saveUserId}
        />
       <input
        type="password"
        placeholder="비밀번호"
        onChange={saveUserPw}
        />

/* 함수를 미리 정의하고, 삼항 연산자를 사용해서 가독성 높이기

isValid라는 유효성 검사를 통해서,
valid(유효하면) 버튼의 disabled 속성을 false로 준다 (작동 되도록)
invalid(무효면) 버튼의 disabled 속성을 true로 준다 (작동 안하도록) */

       <button
        className="loginButton"
        disabled={isValid ? false : true}
        >
        로그인
       </button>
 </form>

// SCSS 정의

.loginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 18px;
  border-radius: 5px;
  margin-top: 10px;
  border: none;
  background-color:#3c648d;
  color: white;

/*
disabled 되었을 때 연한 상태이다가, disabled=false가 되었을 때 진해지면서 버튼이 활성화되는 것을 시각적으로 보여주기
*/

  &:disabled {
    opacity: 0.5;
  }
}

// 함수 정의

// 1.  useState를 사용하여 input값을 업데이트 해주기

const [id, setId] = useState("");
const [pw, setPw] = useState("");

// 2. onChange 발생 시, 실행시킬 함수 정의해주기 (input에 입력된 값을 id /pw 값으로 정의)

const saveUserId = (e) => {
  setId(e.target.value);
};

const saveUserPw = (e) => {
  setPw(e.target.value);
};

// 3.  isValid라는 유효성을 검사하는 함수 만들기

const isValid = id.includes("@") && pw.length >= 5;


```

> 2.  활성화된 로그인 버튼 클릭 시, 메인 페이지로 이동  
>     /main으로 이동

- react-router-dom 중에서 useNavigate 사용
- 버튼에 onClick 이벤트 추가

```js
// useNavigate 사용

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/main');
  };

  return <div></div>;
};

// button 속성에 onClick 추가

<button
  className='loginButton'
  disabled={isValid ? false : true}
  onClick={goToMain}
>
  로그인
</button>;
```

### 전체 코드

```js
// Login.js

import React from 'react';
import { useState } from 'react';
import '../../styles/common.scss';
import '../../styles/reset.scss';
import './Login.scss';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/main');
  };

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const saveUserId = (e) => {
    setId(e.target.value);
  };

  const saveUserPw = (e) => {
    setPw(e.target.value);
  };

  const isValid = id.includes('@') && pw.length >= 5;

  return (
    <React.Fragment>
      <div className='loginBody'>
        <div className='loginContainer'>
          <div className='loginLogoSpace'>
            <span>Instagram</span>
          </div>
          <div className='loginBox'>
            <input
              type='email'
              placeholder='전화번호, 사용자 이름 또는 이메일'
              onChange={saveUserId}
            />
            <input
              type='password'
              placeholder='비밀번호'
              onChange={saveUserPw}
            />

            <button
              className='loginButton'
              disabled={isValid ? false : true}
              onClick={goToMain}
            >
              로그인
            </button>
          </div>
          <div className='loginFooter'>
            <a href='#'>
              <p>비밀번호를 잊으셨나요?</p>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
```

```scss
// Login.scss

.loginBody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loginContainer {
  display: flex;
  flex-direction: column;
  border: 1px solid #e9e9e9;
  align-items: center;
  background-color: white;
  width: 80%;
  margin-top: 100px;
}

.loginLogoSpace {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-family: 'Lobster', cursive;
    font-size: 60px;
    transform: none;
    -webkit-transform: scale(1, 1.5);
  }
}

.loginBox {
  display: flex;
  flex-direction: column;

  input {
    border: 2px solid #f6f6f6;
    background-color: #fafafa;
    height: 40px;
    width: 350px;
    font-size: 14px;
    border-radius: 5px;
    padding-left: 10px;
    margin-bottom: 10px;
  }

  input::placeholder {
    color: #a9a9a9;
  }
}

.loginFooter {
  height: 200px;
  width: 100%;
  position: relative;

  p {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  a {
    color: #3c648d;
    font-weight: 600;
  }
}

.loginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 18px;
  border-radius: 5px;
  margin-top: 10px;
  border: none;
  background-color: #3c648d;
  color: white;

  &:disabled {
    opacity: 0.5;
    color: white;
  }
}
```

### 새로 알게된 것

1.  Tagname의 속성 값 안에도 삼항연산자를 사용할 수 있음

2.  button이 disabled 되면, 어차피 안에 있는 함수가 실행되지 않기 때문에 굳이 `onClick={isValid && goToMain}`을 쓰지 않아두 됨
