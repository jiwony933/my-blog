---
title: '[React] key 값이 필요한 이유 Warning : Each Child in a list should have a unique "key" prop.'
date: '2022-09-01'
category: ''
summary: 'Warning : Each Child in a list should have a unique "key" prop. 무슨 오류일까요?'
---

![](https://velog.velcdn.com/images/jiwonyyy/post/d7d0adce-b7ac-4827-a853-2554b1227755/image.png)

Warning : Each Child in a list should have a unique "key" prop.

콘솔창에 빨간색만 뜨면 심장이 두근두근..

props를 map 할 때 별도의 key 값을 주지 않아도, 페이지는 문제 없이 작동된다. 하지만, 콘솔창을 열어보면 key를 부여하라는 메시지가 뜬다.

> ## Key 값이 뭔가요?
>
> key는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열이다.  
> key는 리액트가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는데에 도움을 준다.

> ## Key 값이 왜 필요한가요?
>
> 지금 구현한 기능은 단순히 map을 통한 나열이지만, 이 key값이 없으면, 추후에 댓글 수정, 삭제 등을 할 때에 어떤 요소를 의미하는지를 컴퓨터가 확인하기 어렵기 때문에 고유의 key 값을 주는 것이 중요하다.

> ## key 값을 주는 방법
>
> 이번에 작성한 코드에서는 아래와 같이 index를 추가하여 key 값을 임시로 부여하여 props에 전달하는 방식을 사용하였다.
>
> ```js
> {
>   storyUsers.map((e) => <StoryUploadUser users={e} key={e.id} />);
> }
> ```
>
> 하지만 일반적으로 다른 곳에서 데이터를 받아 올때에는 객체 내의 id값을 key 값으로 주는 것이 일반적이다. index로 key값을 부여하였을 때에는 고정된 값이 아니기 때문에 추가 기능이 구현될 때 문제가 발생할 수 있다.
>
> 그렇기 때문에 !!!  
> 예를 들어 받아 올 데이터가 아래와 같다고 가정하였을 때,
>
> ```js
> const storyUsers = [
>   {
>     id: 1,
>     userName: 'jiwon',
>     userDescription: '안녕하세요',
>   },
>   {
>     id: 2,
>     userName: 'nahyun',
>     userDescription: '헬로 난 나현',
>   },
>   {
>     id: 3,
>     userName: 'jaetjd',
>     userDescription: '팔로우 해주세요',
>   },
> ];
> ```
>
> ```js
> {
>   storyUsers.map((e) => <UserName key={e.id}>{e.userName}</UserName>);
> }
> ```
>
> 이런 식으로 작성 하면 오류가 사라지는 것을 확인할 수 있다.  
> 그리고 다음에 삭제할 때에도 id 값을 기준으로 삭제하면 됨!!

#### React 공식 문서 참고

[https://ko.reactjs.org/docs/lists-and-keys.html](https://ko.reactjs.org/docs/lists-and-keys.html)
