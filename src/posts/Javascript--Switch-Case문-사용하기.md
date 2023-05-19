---
title: '[Javascript] Switch/Case문 사용하기'
date: '2022-07-05'
category: 'cs'
summary: '복수의 조건문을 깔끔하게 작성할 때 사용하면 좋은 switch/case 문'
---

복수의 조건문을 깔끔하게 작성할 때 사용하면 좋은 switch/case 문

> **기본 형태**
>
> ```javascript
> switch(a){
> case 'value1' : ;
> break;
> case 'value2' : ;
> break;
> case 'value3' : ;
> break;
> default : ~~~~~~; // default는 생략 가능
> }
> ```
>
> - 변수 a의 값과 일치하는 값이 나올때 까지 비교를 이어감
> - 일치하는 값이 나오면 case 다음에 나온 내용을 실행 함
> - 각각의 case 사이를 break로 깨주지 않으면, 일치하는 case아래의 모든 내용을 실행하므로 break로 멈춰주는 것이 중요

> > **_활용 1) 나이를 입력했을 때 고등학교 몇학년인지 알림 띄우기_**
> >
> > ```javascript
> > let Age = prompt('당신의 나이는 몇살입니까?');
> > switch (Age) {
> >   case '17':
> >     alert('고등학교 1학년 입니다');
> >     break;
> >   case '18':
> >     alert('고등학교 2학년 입니다');
> >     break;
> >   case '19':
> >     alert('고등학교 3학년 입니다');
> >     break;
> >   default:
> >     alert('일치하는 정보가 없습니다');
> > }
> > ```
> >
> > - prompt창에서 17을 입력하면 '고등학교 1학년 입니다'  
> >   prompt창에서 18을 입력하면 '고등학교 2학년 입니다'  
> >   prompt창에서 19를 입력하면 '고등학교 3학년 입니다'  
> >   prompt창에서 그 외의 수를 입력하면 '일치하는 정보가 없습니다'
> >
> > - 22/07/06 추가 사항
> >   - 프롬프트 창에 숫자를 입력하여도, 그 값은 string형태로 받아와진다.
> >   - 이를 숫자로 바꾸기 위해서는 parseInt를 사용해야함
> >   - parseInt(Age)라고 작성하게 되면 입력값을 숫자로 인식하게 되어서 각각의 case에 따옴표를 쓰지 않아도 됨! 좀 더 깔끔해진 코드로 불편한 마음이 사라졌다!
> >     ```js
> >     let Age = prompt('당신의 나이는 몇살입니까?');
> >     switch (parseInt(Age)) {
> >       case 17:
> >         alert('고등학교 1학년 입니다');
> >         break;
> >       case 18:
> >         alert('고등학교 2학년 입니다');
> >         break;
> >       case 19:
> >         alert('고등학교 3학년 입니다');
> >         break;
> >       default:
> >         alert('일치하는 정보가 없습니다');
> >     }
> >     ```
