---
title: '💻 크롬 브라우저 아키텍처부터 시작하는 브라우저에 url을 입력했을 때'
date: '2023-09-20'
category: 'CS'
summary: '브라우저에 url을 입력했을 때 일어나는 일은? 아주 단골 면접 질문이다. 크롬 브라우저 아키텍처부터 시작해보자~! :)'
---

브라우저에 url을 입력했을 때 일어나는 일은?
아주 단골 면접 질문이다.

```
보통 준비하는 답변

주소창에 www.google.com을 입력하면,
브라우저는 DNS(Domain Name System)를 사용하여 도메인 이름을 IP 주소로 변환합니다.
그리고 변환된 IP 주소를 사용하여 해당 서버에 HTTP 요청을 보냅니다.
서버는 요청을 받고, 요청에 따른 HTML, CSS, JavaScript 등의 리소스를 응답으로 전송합니다.
브라우저는 이를 받아서 파싱하고 렌더링하여 사용자에게 표시합니다.
```

하지만 그 전후, 그리고 그 사이에는 더 많은 단계가 있으니, 더 깊게 알아보도록 하자!

우선은, 브라우저 아키텍처에 대해서 알아야 한다.

## 크롬브라우저 아키텍처

아래는 브라우저 아키텍처 표준을 도식화한 그림이다(여러 브라우저들은 아키텍처가 조금씩 다르다.)

![](https://velog.velcdn.com/images/jiwonyyy/post/dd84d30f-7881-4253-84a1-a151b3a5503e/image.png)

크롬 브라우저 아키텍처는 아래와 같다.

![](https://velog.velcdn.com/images/jiwonyyy/post/f35be309-4b76-4fae-a09b-cf81227ee1c5/image.png)

우선 위의 그림에서 눈에 띄는 점은

1. 브라우저 프로세스는 모두와 연결되어 있다.
2. renderer process와 plugin process는 여러개 이구나.

각각이 어떤 역할을 하는지 살펴보도록 하자.

![](https://velog.velcdn.com/images/jiwonyyy/post/e95d35a2-7210-4cbe-8f1a-28201d3ed219/image.png)

- Browser Process
  - 사용자 입력이 일어나는 것을 처리하는 ui thread, 요청을 보내는 network thread
  - 탐색 버튼, 북마크, 설정 메뉴 등이 여기에 포함된다.
- Renderer process : 탭 하나가 그리고 있는 브라우저의 화면(탭 하나당 renderer 하나)
  - 웹 페이지의 렌더링, 상호작용을 담당.
  - 여러 개가 있기 때문에, 하나의 탭의 오류가 브라우저 전체 오류로 이어지진 않는다.
  - 현재는 하나의 iframe당 하나의 renderer를 가지는 상태 까지 진화하였음
- Plugin Process : (플러그인 하나당 하나)
  - Adobe Flash Player, PDF 뷰어, 비디오 코덱, 확장 기능 등이 플러그인
- GPU Process
  - Browser Process와 Renderer Process가 그리는 모든 화면을 담당

### 크롬 브라우저 아키텍처의 장점

- 탭 마다 renderer process가 있기 때문에, 하나의 process를 강제종료 시키더라도 다른 탭은 보존할 수 있다.
- process별로 고유한 메모리를 할당받기 때문에 권한이 없는 서로다른 renderer process(와 갖고 있는 메모리)에 접근할 수 없다. (보안에 유리하다)

### 크롬 브라우저 아키텍처의 단점

- renderer process가 계속해서 늘어나면서, 고유 메모리 영역도 늘어나면서 메모리 사용이 많아진다.
- 한계점(limit)에 도달했을 때에 process를 통합하여 메모리를 절약하는 작업을 하게 된다.

위에서 확인 할 수 있듯이, 크롬 브라우저는 여러 프로세스를 가지는 `멀티 프로세스 아키텍처`이다.

그렇다면 process에 대해서도 간단히 알아보도록 하자.

### 프로세스

- 프로세스는 프로그램이 OS에 의해 메모리 영역을 할당받고 실행 중인 것.
- process가 하나 생성될 때, 싱글이든 멀티든 memory는 하나이다.

#### 멀티 프로세스는?

- OS가 다른 영역의 메모리를 할당해주고 있기 때문에 서로 소통이 필요하다.
  -> IPC(Inter Process Communication)이 필요하다.

### 스레드와 하드웨어는 어떤 연관이 있을까?

- CPU의 구성 요소 중 core가 thread 하나당 core 하나로 매핑된다. (1core, 1thread)
  - single core processor의 경우 하나의 스레드만 처리가 가능하다.
  - multi core processor는 여러개의 스레드를 동시에 처리할 수 있다.

#### 싱글 스레드 프로세스

- 하나의 프로세스 안에 스레드가 1개인 것
  - javascript는 싱글 스레드 기반 비동기 처리 언어이다. (하나의 실행 흐름을 갖는다)
    (비동기로 처리하기 때문에 동시에 처리하는 것 처럼 보임)

#### 멀티 스레드 프로세스

- 하나의 프로세스 안에 스레드가 여러개인 것
- 스레드 끼리 메모리를 공유하고 있기 때문에, 필요한 데이터를 빠르게 공유할 수 있다.
- 서로 다른 프로세스에 접근하기 위해서는 IPC를 통해서 접근할 수 있다. (따라서 process를 여러개 띄우게 되면 메모리 점유율이 높아진다.)

## 그렇다면 다시 돌아와서, 크롬 브라우저에서 url을 쳤을 때 발생하는 일을 알아보자!

![](https://velog.velcdn.com/images/jiwonyyy/post/5bc902c8-40a8-4c8c-bb60-47f9ac08efcd/image.png)

### 1. Handling Inputs (Browser Process)

- browser process안에 UI thread가 해당 text가 url인지 search query인지 판단하게 됨.
  - url로 판단되면 network thread로 url 값 전달
  - search query로 판단되면 google search engine으로 전달하여 바로 검색

### 2. Start navigation (Browser Process)

- enter를 입력하면 시작되는 과정
- 이 단계에서 UI thread가 미리 renderer process를 찾아둔다.

#### UI thread

- ui thread가 network call을 inititate하고 loading spinner를 그려줌
- network thread에 url 값을 전달한다.

#### Network thread

- url 값을 활용하여 DNS에 연결, SSL/TLS 커넥션(보안 관련 레이어) 생성한다.
  - 해당 요청에 대해 301 redirect가 오면 ui thread에게 다시 전달하면 다른 call
  - 301이 아니면 Read Response 로 이동된다.
- Network Thread는 URL을 사용하여 원격 서버와의 통신을 시작
  - DNS Resolution : 주어진 호스트 이름(도메인)을 IP 주소로 변환
    - 여기서 DNS 캐시를 사용하여 동일한 도메인에 대한 이전 결과를 저장하고 불필요한 DNS 조회를 줄임
  - TCP/IP 연결: 서버 신뢰성을 확인하는 단계
  - HTTP 요청: HTTP 프로토콜을 사용하여 서버에 요청을 보낸다.
  - 서버 응답 대기: 서버로부터의 응답 대기.

### 3. Read Response (Browser Process)

- Response를 읽는 과정

- 1.  response의 일부 바이트를 읽는다.
- 2. header에 심긴 content type을 확인 한다.
  - html 형식이다? Renderer process에 _파일 전달 준비_
  - 그 외의 형식이다? Download Manager에게 _파일 전달 준비_
    <파일 전달 전 아래와 같은 행위를 함 - 안전성 검증>
- 3. Safe browsing
  - 구글에서 제공. domain/data가 악의적인 사이트인지 체크하는 과정
- 4. CORB (Cross Origin Read Blocking)
  - 민감한 cross-site data인지 확인하고, 민감하면 renderer process에게 전달하지 않음!

### 4. Find Renderer Process (Browser Process)

- 브라우저가 해당 사이트로 이동해야 한다고 결정된 후의 과정.
- 1. network thread가 UI thread에 data가 준비되었다고 전달
- 2. 2단계에서 미리 찾아놓은 Renderer process에게 html 전달

### 5. Commit Navigation (Browser, Renderer Process)

- 1. Renderer process에게 파일을 전달하고 이후 렌더링이 진행됨
     (이때 Inter Process Communication이 발생하게 됨!)
- 2. data stream을 보내어 renderer process가 html을 계속 받을 수 있도록 한다.
- commit navigation이 되고 나면, renderer => browser에 알려준다.
- navigation이 끝나면 document loading phase가 시작 됨
  - 주소창이 업데이트 (자물쇠 모양 등이 생김)
  - 새로운 페이지에 대한 정보로 사이트를 다시 그린다.
  - commit 되었다는 것 == session 히스토리에 추가된다. (뒤로/앞으로 가기, 껐을때 다시 복구하기 등)

### 6. Initial Load Complete!

- html 외에 img, css, js 등 resource를 계속해서 로딩해옴.
- page load가 완료 되면 다시 IPC를 통해 browser에 알려준다.
  -> 이때 browser가 탭에서 loading spinner을 지워줌.

### 7. 화면에 rendering~

<br><br><br><br><br><br>

단순히 면접 답변용으로 생각했을 때에는, DNS에서 IP주소를 알아내서~ 로 알고 있다가 .. 크롬 브라우저 아키텍처에서부터 시작하게 되니 생각보다 훨씬 더 깊은 과정이었고 공부할 게 많다는 생각이 들었다!

<br><br><br><br>

> Reference
> https://developer.chrome.com/blog/inside-browser-part1/ >https://www.youtube.com/@withBoaz
> '가장 쉬운 웹개발 with Boaz' 유튜브에서 일목 요연하게 잘 설명해준 부분을 다시 포스팅 하며 복기해보았다.
