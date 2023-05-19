---
title: '[CSS] 여백 주기 (margin vs padding)'
date: '2022-07-12'
category: ''
summary: 'margin vs padding !? 당신의 선택은??'
---

CSS를 적용시킬 때 마다 헷갈려서 매번 구글링을 하게 되는..  
화면 배치를 싹 정리해보고자 한다.

### margin VS padding

> `margin` : 내부로 여백을 주는 것  
> `padding` : 외부로 여백을 주는 것
>
> 같은 h 100px w 100px 사이즈 박스에  
> 각각 padding과 margin을 20px씩 적용했을 때 결과는 아래와 같이 나타난다.  
> ![](https://velog.velcdn.com/images/jiwonyyy/post/8a5f6b7d-fb91-48dc-9528-abc44cbf0fba/image.png)
>
> ```css
> .text {
>   height: 100px;
>   width: 100px;
>   background-color: aquamarine;
>   padding: 20px;
> }
> .text2 {
>   height: 100px;
>   width: 100px;
>   background-color: lightsalmon;
>   margin: 20px;
> }
> ```
>
> - padding은 박스 사이즈 자체가 100+20+20으로 총 140\*140이 된다
> - margin은 박스 사이즈 자체는 그대로, 바깥쪽으로 색상없는 여백이 20씩 생긴다.
> - 상하좌우 개별로 padding과 margin을 줄 수도 있다.  
>   `padding-top`  
>   `padding-bottom`  
>   `padding-right`  
>   `padding-left` > `margin-top`  
>   `margin-bottom`  
>   `margin-right`  
>   `margin-left`

### box-sizing : border-box

> - padding(안쪽으로 여백)을 주되, 박스 사이즈에 영향을 주고 싶지 않다면 `box-sizig : border-box;`을 사용하면 된다.
> - border-box 적용 시 내가 지정한 width / height = 안쪽여백, 테두리 포함한 최종 크기  
>   ![](https://velog.velcdn.com/images/jiwonyyy/post/b9491f61-2aaf-44d0-88f1-91650b7cb7e4/image.png)
>
> ```css
> .text {
>   height: 100px;
>   width: 100px;
>   background-color: aquamarine;
>   padding: 20px;
>   box-sizing: border-box;
> }
> .text2 {
>   height: 100px;
>   width: 100px;
>   background-color: lightsalmon;
>   margin: 20px;
> }
> ```
>
> 좌측 녹색 박스는 padding + border-box  
> 왼쪽 코랄 박스는 margin

[https://www.w3schools.com/css/css_margin.asp](https://www.w3schools.com/css/css_margin.asp)  
[https://www.w3schools.com/css/css_padding.asp](https://www.w3schools.com/css/css_padding.asp)
