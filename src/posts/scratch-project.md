---
title: '스크래치 프로젝트 구조를 알아보자'
date: '2023-12-01'
category: 'scratch'
summary: '블럭 코딩 프로그래밍 언어인 scratch.. 어떻게 되어있나?'
---

새로 맡게된 업무는 스크래치를 modification하여 자체 프로그램을 만드는 것이다. 기존에 해왔던 웹개발과는 많이 달라서 스크래치가 뭔지..에서부터 프로젝트의 구조를 이해하는 것까지..
그리고 이슈를 할당받았을 때 대체 어떤 레포지토리에서 작업을 해야하는지부터 난관이었다.
그래서 이해한 부분을 조금이나마 정리해두려고 한다.

## 스크래치란?

스크래치는 MIT에서 만든 프로그래밍 언어이다. 텍스트로 코딩이 하는 것이 아니라, 기존에 만들어져있는 스크립트 블록을 연결하면서 코딩을 할 수 있다.

![](https://velog.velcdn.com/images/jiwonyyy/post/8c1a6429-4bb4-496f-b4cf-f5eb458b1b5d/image.png)

예시 이미지와 같이,
흔히 개발할때 사용하는 변수, 반복문, 조건문, 실행문 등등이 모두 블럭으로 구성되어있다! 블럭 형태로 끼워 맞추는 코딩 방식이라 최근 초등학생들 사이에서도 많이 사용되고 있는 교육용 프로그래밍 언어이다.
https://scratch.mit.edu/projects/editor/?tutorial=getStarted

## 스크래치 프로젝트 구조

스크래치 오픈소스 레포지토리
https://github.com/scratchfoundation

스크래치 프로젝트는 어떤 구조를 갖고 있을까?

스크래치는 모놀리틱 모노레포 구조를 갖고, npm link 방식으로 연결하여 개발 하고 있다.

> ### npm link
>
> npm Link는 개발 중인 로컬 패키지를 프로젝트의 다른 부분과 연결할 때 사용하는 도구이다. 이를 통해 A 레포지토리가 B와 C를 로컬로 참조하고 개발 중인 내용을 바로 반영할 수 있는 방법이다.
>
> 패키지 간 의존성 및 협업: 여러 개의 패키지가 서로 의존성을 가질 때, 이러한 패키지를 개발하고 테스트하는 데 용이하다. 특히 여러 패키지 간의 수정 및 테스트가 동시에 필요한 경우에 유용하다.

스크래치를 modification 하기 위해서는 가장 중요한 3개의 레포지토리가 있다. gui, vm, blocks이다. gui를 build하게 되면, vm, blocks등이 gui에서 라이브러리 형태로 삽입되게 된다.

![](https://velog.velcdn.com/images/jiwonyyy/post/3b6c293c-e663-4837-a9e1-0114477ca677/image.png)

## **scratch-gui**:

`Graphical User Interface for creating and running Scratch 3.0 projects.`
Scratch GUI는 Scratch 블록 프로그래밍 환경을 개발하는 레포지토리이다. 스크래치를 실행했을 때 view단을 담당하고 있다. 인터페이스 등을 추가, 수정할 수 있다.

## **scratch-vm**:

`Virtual Machine used to represent, run, and maintain the state of programs for Scratch 3.0`
Scratch VM(가상 머신)은 Scratch 프로젝트의 실행을 담당하는 핵심 엔진이다. 새로운 확장과 블럭들을 개발하거나, 새로운 기기를 연결하는 것 등을 VM에서 관리할 수 있다. 사용자 정의 및 확장 구성 요소가 필요한 경우 이 라이브러리에서 작업하면 된다.

## **scratch-blocks**:

`Scratch Blocks is a library for building creative computing interfaces.`
Scratch Blocks는 블록 기반 프로그래밍 모듈이다. blocks는 google의 blockly라는 블록 프래그래밍 에디터를 기반으로 만들어져있다. (https://developers.google.com/blockly?hl=ko)

## ETC

**scratch-l10n** : 다국어 지원을 위해 사용되는 단어 정의가 되어있는 프로젝트이다.
(새로 알게 된것은 l10n은 localization 첫 알파벳 l과 마지막 n사이에 10개의 알파벳이 있어서 l10n이다. 같은 맥락으로, internationalization은 i18n이다.)

**scratch-desktop** : 스크래치를 데스크톱앱으로 빌드할 때 사용되는 레포지토리이다. electron으로 개발되어있다.

**scratch-render** : 오른쪽 고양이가 보이는 부분(스테이지)을 렌더링 하는 패키지이다.

각 패키지 간의 관계를 그림으로 그려보면 아래와 같은 구조일 것이다.
![](https://velog.velcdn.com/images/jiwonyyy/post/8586fbbe-22f2-4edb-8dc5-b0e556f58fa1/image.png)

## 스크래치 코드 기반 개발 시 어려웠던 점..

1. 스크래치의 코드는 아주 오래되었다.

- 스크래치는 2005년에 처음 개발된 프로그램이다. 스크래치 3버전임에도 commit을 살펴보면 5년전.. 6년전.. 심지어 react 코드는 class component를 사용해서 처음에 적응하는데에 힘들었다.
- 하지만, class component를 이번에 처음 사용해보게 되었는데 글로만 읽던 react life cycle을 이해하는데에는 많은 도움이 되었다.

2. 스크래치 레포지토리 간의 관계를 파악하는데 어려웠다.

- 스크래치 화면에서 보면 GUI에서 구현된 것 같던 기능들도, blocks에서 구현된 경우도 있었고 (toolbox에 새로운 버튼을 그리는 부분도 당연히 gui라고 생각했는데 scratch-blocks에서 다루어야 했다.)
- vm에서 일어난 event를 gui에서 어떻게 감지하는지 등도 처음엔 이해하기가 어려웠다.

3. 구글링이 쉽지 않다. scratch 블럭을 사용해서 코딩하는 것들만 잔뜩 나오고..

- 아무래도 보편적인 개발이 아니다 보니, 커뮤니티가 활발하지 않다. 지피티도 잘 모른다.. 하나하나 코드를 뜯어보면서 개발하는 수 밖에..

4. 외부 기기 연결에 대한 부분..

- 새로 개발해야하는 extension들이 브라우저 단에서만 실행되는 것이 아니라 카메라를 연결하거나 로봇 등을 연결했을 때 이를 동작시켜야 하는 경우가 있다..
- 특히 디버깅을 할때 기기와 관련된 부분이면 .. ? 이 부분은 아직 많이 손대보진 못했다
