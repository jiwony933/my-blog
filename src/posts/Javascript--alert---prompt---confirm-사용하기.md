---
title: '[Javascript] alert / prompt / confirm 사용하기'
date: '2022-07-05'
category: 'client'
summary: 'alert - 알려주기 (알림창) prompt -  입력받기 (문자 입력창) confirm - 확인 받기 (확인창 확인/취소)'
---

### 개념

- alert - 알려주기 (알림창)
- prompt -  입력받기 (문자 입력창)
- confirm - 확인 받기 (확인창 확인/취소)

> #### 1\. alert
>
> alert("문구")  
> ("") 안에 들어가는 문구가 들어간 알림창이 뜬다.  
> 확인 버튼을 누르면 닫힘
>
> ```javascript
> alert('안녕하세요 어서오세요');
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/1e0837eb-20d3-4d82-a5c5-e88e341e928d/image.png)

> #### 2\. prompt
>
> prompt("문구")  
> ("") 안에 들어가는 문구가 들어간 입력창이 뜬다.  
> 내용을 입력하거나 취소 버튼을 누르면 닫힘
>
> ```javascript
> prompt('이름이 무엇인가요?');
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/98f05692-1222-4196-8af0-aef6bbccd3a6/image.png)  
> +작성 예시 안내를 위한 default 값 입력하기  
> 알림 문구 뒤에, default로 원하는 값을 입력하면, 입력창에 기본값으로 보여짐
>
> ```javascript
> prompt('생년월일을 입력해주세요', '1900-11-10');
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/9b8eec0a-f6b3-4a90-b0d1-8f234bc338ae/image.png)

> #### 3\. confirm
>
> confirm("문구")  
> ("") 안에 들어가는 문구가 들어간 확인창이 뜬다.
>
> ```javascript
> confirm('당신은 성인입니까?');
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/8a7174ca-0e98-40a6-867d-addfaacd05bc/image.png)
>
> ```javascript
> const isAdult = confirm('당신은 성인입니까?');
> console.log(isAdult);
> ```
>
> 확인 누르면 -> true  
> 취소 누르면 -> false

> #### 4\. 기타(이것저것 응용해보기)
>
> > **1) prompt에 입력된 값을 alert창에 보여주기**  
> > prompt 를 통해 이름 정보를 받고, 이름 정보를 사용하여 alert창 띄우기
> >
> > ```javascript
> > const name = prompt('이름을 입력해주세요');
> > alert('안녕하세여 ' + name + ' 님');
> > ```
> >
> > **2) prompt에 입력된 값을 조건문을 사용해서 각자 다른 alert창 보여주기**
> >
> > ```javascript
> > const age = prompt('당신은 몇살이십니까?');
> > console.log(age);
> > if (age > 19) {
> >   alert('어서오세요');
> > } else {
> >   ('이용이 불가능 합니다');
> > }
> > ```
> >
> > **3) confirm에 입력된 값의 결과에 따라 다른 alert창 보여주기**
> >
> > ```javascript
> > const isFemale = confirm('당신은 여성입니까?');
> > console.log(isFemale);
> > if (isFemale == true) {
> >   alert('환영합니다');
> > } else {
> >   ('여성회원만 모집중입니다');
> > }
> > ```
