---
title: '[CSS] 화면 배치 정복 2 (display)'
date: '2022-07-12'
category: 'client'
summary: '화면 레이아웃 구성을 위한 두번째 정리display : block항상 새로운 line에서 시작하며, full width를 갖는다display : flexdisplay : flex를 지정하지 않을 때, div내의 자식 요소들은 세로로 차례대로 배열 된다flex를 적용시키'
---

화면 레이아웃 구성을 위한 두번째 정리

> `display : block`  
> 항상 새로운 line에서 시작하며, full width를 갖는다

> `display : flex`
>
> - display : flex를 지정하지 않을 때, div내의 자식 요소들은 세로로 차례대로 배열 된다
> - flex를 적용시키면, 각 요소들이 유연하게 연결되어서 배치됨  
>   ![](https://velog.velcdn.com/images/jiwonyyy/post/c0032654-9d42-4ae5-b2c1-87a5692f0282/image.png)
>
> ```css
> .container {
>   border: 1px solid;
>   width: 300px;
>   height: 300px;
> }
> .container2 {
>   border: 1px solid;
>   width: 300px;
>   height: 300px;
>   display: flex;
> }
> ```
>
> 좌 : display flex 지정 X  
> 우 : display flex 지정 O
