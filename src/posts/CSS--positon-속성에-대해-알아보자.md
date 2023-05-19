---
title: '[CSS] positon 속성에 대해 알아보자'
date: '2022-08-16'
category: ''
summary: 'position 속성 - relative, absolute, fixed'
---

### `positon`

> - position 속성을 통해 문서 상에 요소를 배치하는 방법을 지정한다.
> - top, right, bottom, left 속성을 통해 요소의 최종 위치를 결정한다.

### 사용 방법은 매우 간단하다!

> 1. position 방법 정하기
>
> ```css
> position: fixed;
> ```
>
> 2. 이동시키기
>
> ```css
> top: 10px;
> ```
>
> 이렇게 되면 화면 위에서 10px 떨어진 채로, 스크롤을 내려도 딱 붙어있는 menu 등을 만들 수 있다.

### `position` 의 속성들

> `position : fixed`
>
> - `div`와 관계 없이, window의 viewport에서 고정된 값을 갖는다.
>
> `position: relative;`
>
> - 원래 자기 위치 기준으로 어떠한 위치에 배치될 지를 정한다.
>
> `position : absolute`
>
> - 가장 가까운 부모 요소 아래에서 절대적인 위치를 갖는다.
> - 부모요소가 없다면 window 객체의 viewport를 기준점으로 배치된다.

어떻게 배치되는지 레이아웃을 살펴보자면,,  
우선 contatiner 내부에 3개의 박스를 그려보았다..

![](https://velog.velcdn.com/images/jiwonyyy/post/10cbc73e-5fcd-452f-85aa-15f9539d7040/image.png)

- 화면 안에 베이지색 container 가 있고,
- container 안에 각각 1,2,3번의 box가 있음!

> ### `position : fixed`
>
> - `div`와 관계 없이, window의 viewport에서 고정된 값을 갖는다.
>
> ```css
> .item1 {
>   position: fixed;
>   bottom: 0;
>   right: 0;
> }
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/079b382a-389b-44d2-800e-a7bb2bf10d1d/image.png)
>
> - 부모 div랑 관계 전혀 없이 페이지 내의 우측 하단에 고정!
> - 페이지 크기를 조정하면, 우측 하단에 붙은채로 함께 움직인다.

> ### `position: relative;`
>
> - 원래 자기 위치 기준으로 어떠한 위치에 배치될 지를 정한다.
>
> ```css
> .item3 {
>   position: relative;
>   top: 20px;
>   left: 40px;
> }
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/6bc7f6a6-8901-491f-8f91-76c4ead41a0d/image.png)
>
> - 원래 위치는 2번 박스 아래에 붙어 있어야 하는데,  
>   그 위치를 기준으로 위에서 20 px내려오고, 왼쪽에서 40px 이동하였다.

> ### `position : absolute`
>
> - `position`을 갖는 가장 가까운 부모 요소 아래에서 절대적인 위치를 갖는다.
> - 부모요소가 없다면 window 객체의 viewport를 기준점으로 배치된다.  
>   (마치 `fixed`처럼...)
>
> ```css
> .container {
>   position: relative;
> }
> .item3 {
>   position: absolute;
>   top: 20px;
>   left: 40px;
> }
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/1f719fa5-c9d1-42bb-88de-f165e5fb78fe/image.png)
>
> - 상위 요소인 container가 position을 갖기 때문에,  
>   container 시작점을 기준으로 위에서 20, 왼쪽에서 40 이동.
