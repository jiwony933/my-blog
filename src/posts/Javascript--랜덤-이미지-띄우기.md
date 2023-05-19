---
title: '[Javascript] 랜덤 이미지 띄우기'
date: '2022-08-01'
category: 'client'
summary: '새로고침될 때 마다 랜덤으로 이미지를 띄울 수 있는 기능을 넣고자 했다(텍스트 아래에 있는 미모티콘 이미지가 계속 바뀜)Math.random() 함수는 0~1 사이의 임의의 난수를 반환한다Math.floor(num) num 이하 가장 큰 정수를 반환한다. (소수점 아래'
---

새로고침될 때 마다 랜덤으로 이미지를 띄울 수 있는 기능을 넣고자 했다  
![](https://velog.velcdn.com/images/jiwonyyy/post/b6b9dd45-a80c-497c-b27f-c71a0d6b0034/image.png)  
(텍스트 아래에 있는 미모티콘 이미지가 계속 바뀜)

> ### 1\. 랜덤으로 바꿀 이미지를 저장하고, 파일 명으로 배열을 만들어 준다.
>
> ```js
> const emoticons = ['jw1.png', 'jw2.png', 'jw3.png', 'jw4.png'];
> ```

> ### 2\. 임의의 파일을 가져올 수 있게 `random` 함수 사용
>
> ```js
> const todayEmoticon = emoticons[Math.floor(Math.random() * emoticons.length)];
> ```
>
> - `Math.random()` 함수는 0~1 사이의 임의의 난수를 반환한다
> - `Math.floor(num)` num 이하 가장 큰 정수를 반환한다. (소수점 아래 내림)
> - 파일이 총 4개라, array\[0\]~array\[3\] 중에 랜덤으로 index 수를 받아야 함  
>   `Math.random()` 에 배열의 길이를 곱하고 `Math.floor`(내림)을 적용 시키면 0, 1, 2, 3 중의 하나의 수가 나옴

> ### 3\. createElement를 사용하여 html에 img 요소 추가
>
> ```js
> const etImg = document.createElement('img');
> ```
>
> - `Document.createElement()` 는 지정한 tagName의 HTML 요소를 만들어 반환한다.
> - 생성된 img의 src와 width등 스타일도 지정해준다.
>
> ```js
> etImg.src = `src/${todayEmoticon}`;
> etImg.width = 300;
> ```

> ### 4\. appendChild()를 사용하여 element의 위치 지정
>
> ```js
> const homePage = document.querySelector('.home');
> homePage.appendChild(etImg);
> ```
>
> - `Node.appendChild()`는 선택한 node 안에 자식요소를 추가한다.
> - 여기서는 home이라는 div 안에 이미지를 삽입하기 위하여 위와 같이 코드 작성.

> ### \[전체 코드\]
>
> ```js
> const emoticons = ['jw1.png', 'jw2.png', 'jw3.png', 'jw4.png'];
>
> const todayEmoticon = emoticons[Math.floor(Math.random() * emoticons.length)];
>
> const etImg = document.createElement('img');
> etImg.src = `src/${todayEmoticon}`;
> etImg.width = 300;
>
> const homePage = document.querySelector('.home');
> homePage.appendChild(etImg);
> ```
