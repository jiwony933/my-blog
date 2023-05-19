---
title: '[CS study] git / github / git 명령어'
date: '2022-08-24'
category: 'cs'
summary: 'git / github / git 명령어를 공부해보자!'
---

## git 이란?

버전을 관리하는 시스템이다.  
(Version Control System)

#### 버전이란?

- 어떤 프로그램을 수정, 개선하여 완성한 것
- 이전과 약간씩 다른 변화들을 구분하는 표시

#### 왜 코드 버전 관리를 하나요?

- 버전으로 관리하지 않고, 수정할 때마다 새로운 파일을 만들면 관리하기가 어려움  
  ▶︎ ppt(최종) ppt(최최종) ppt(진짜최종)  
  \-----> 다들 이런 경험 있으시죠? ㅎ
- 버전을 생성해놓음으로써, 언제든 이전 버전의 코드로 돌아갈 수 있음 (추가로 개발하다가 오류가 나면, 이전에 저장했던 버전으로 back!)
- 하나의 프로젝트를 두고 여러 개발자들이 협업할 수 있음
- 프로그램이 만들어지는 이력을 관리할 수 있음

## github란?

- git을 사용한 프로젝트들의 저장소
- 개발자들의 social network

![](https://velog.velcdn.com/images/jiwonyyy/post/5343aa9f-f3b5-4fc5-84cf-e45364020af6/image.png)

정리하자면,

> ### git
>
> 버전 관리 도와주는 시스템
>
> ### github
>
> git을 이용한 프로젝트를 관리하게 해주는 호스팅 서비스

### git 명령어 (basic)

우선 아래의 명령어만 숙지해두면, 아주 간단한 버전 관리 가능

> - ### git init
> - ### git status
> - ### git add
> - ### git commit
> - ### git log
> - ### git push

### git init

- git 저장소 생성/버전 관리를 위한 정보 생성
- 버전 관리를 하고 싶은 디렉토리에서 git init 입력

### git status

- 현재 파일 상태를 확인 가능  
  ![](https://velog.velcdn.com/images/jiwonyyy/post/b099a67b-fba0-43f9-89d3-a119aa5b3cb8/image.png)

### git add

- 파일 수정 이력 기록을 **_준비_**하는 명령어
- 마치, 쇼핑몰에서 \[ 장바구니 담기 \]라고 생각하면 편함  
  특정 파일만 add : git add \[file name\]  
  변경된 전체 이력 add : git add .

### git commit

- add 명령어를 통해 준비된 수정 이력을 **_기록_**하는 명령어
- 마치, 쇼핑몰에서 장바구니에 담긴 상품을 \[ 결제 \]  
  git commit -m "메세지"  
  ex) git commit -m "login-form-update"

### git log

- commit 기록을 볼 수 있는 명령어
- 기록 시간, 작성자, commit message 등을 확인 가능  
  ![](https://velog.velcdn.com/images/jiwonyyy/post/3cc1d518-af46-485c-abf0-7c97307364b9/image.png)

### git remote add origin (url)

- 로컬에서 관리한 git을 내 github repositary에 연결해야할 때 쓰는 명령어
- github 사이트에서 레포지터리 생성 후, url을 따온다
- git remote add origin [https://github.com/jiwony033/\[repositaryname\].git](https://github.com/jiwony033/%5Brepositaryname%5D.git)

### git push

- 작성한 코드를 원격 저장소(github)에 업로드  
  (git이 원격 저장소와 연결되어 있어야 작동함)  
  git push origin \[branch name\]

git, github 사용법에 익숙해져야지!
