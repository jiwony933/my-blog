---
title: '[CSS] 웹페이지에 새로운 폰트 적용하기'
date: '2022-05-31'
category: ''
summary: '구글 폰트 불러오기~'
---

## 구글폰트로 무료폰트 적용하기

1.  google font에 접속한다. [https://fonts.google.com](https://fonts.google.com)
2.  원하는 글꼴을 찾는다.  
    언어를 선택하고, 원하는 문장을 쳐보면서 찾을 수도 있다.
3.  원하는 폰트를 찾으면, 우측의 selected family 에서 import 선택 후 링크 복사  
    (보이지 않으면 사각형 로고 클릭하면 확인 가능)

![](https://velog.velcdn.com/images/jiwonyyy/post/c1538abc-a1f8-4211-b204-96bbb0eb4b67/image.png)

![](https://velog.velcdn.com/images/jiwonyyy/post/d62be88d-d1a4-44e0-a8ec-5cfb2961b909/image.png)  
아주 친절하게 나와있어서 바로 복사해서 붙여넣으면 된다.

4.  폰트 import 하기

```null
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap');
```

5.  폰트가 적용될 부분 태그

```null
{ font-family: 'Nanum Gothic Coding', monospace; }
```

6.  완성

![](https://velog.velcdn.com/images/jiwonyyy/post/17408500-d47e-4e6d-a7ff-8eef28c63da5/image.png)
