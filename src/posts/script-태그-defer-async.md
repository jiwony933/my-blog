---
title: '<script /> 태그의 위치는 어디가 좋을까? (feat. defer, async, DOMContentLoaded)'
date: '2023-10-07'
category: 'javascript'
summary: 'script 태그의 속성에 대해서 알아보자. '
---

## script 태그의 위치

`<script/>` 태그는 javascript코드를 웹 페이지에 포함시키는데 사용되는 태그이다.
스크립트 태그는 보통 body의 close 태그 직전에 삽입하는 것으로 알고 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style></style>
  </head>
  <body>
    <div id="box"></div>
    <script />
  </body>
</html>
```

이것은 브라우저에서 화면을 렌더링 할 때, html을 파싱 중 javascript 코드를 만나게 되면 파싱이 중단되기 때문이다.

하지만, body태그의 끝부분에 그냥 `<script/>` 태그를 썼을 때의 문제점이 있다.
html이 엄청 클 때에는 html을 파싱을 마치고나서 javascript를 받으려면 interaction이 이루어질 때 까지 시간이 오래 걸린다는 것이다.

이를 해결하기 위해서 html을 파싱을 하면서, javascript를 비동기적으로 다운로드 받을 수 있게 하기 위해서 `<script/>` 태그에는 `defer`와 `async`라는 속성이 있다. 오늘은 이것을 알아보자!

이 속성을 알기 전에 `DOMContentLoaded`라는 개념을 먼저 이해하면 좋다.

## DOMContentLoaded

- HTML의 생명주기에는 크게 세가지 이벤트가 있다.

1. `DOMContentLoaded`
   - DOM tree를 완성하는 즉시 발생하는 이벤트이다. (img 태그나, stylesheet는 기다리기 전)
2. `load`
   - 이미지, stylesheet 등도 포함한 모든 외부 자원을 불러오는 것 까지 마쳤을 때 발생하는 이벤트.
3. `beforeunload` / `unload`
   - `beforeunload` : 사용자가 사이트를 떠나려 할 때 발생하는 이벤트. ex) 저장되지 않은 변경사항이 있습니다 등
   - `unload` : 사용자가 실제로 사이트를 떠날 때 발생하는 이벤트. ex) 사용자 분석 통계 등을 전송

## defer (지연)

```html
<script defer src="script.js" />
```

#### 요약

- defer 속성이 있으면, 스크립트를 백그라운드에서 다운로드 한다.
- 이 말은 즉슨, script를 다운받는 중에 html 파싱을 멈추지 않는다는 것이다.

#### 실행 시점

- DOM이 준비된 이후, DOMContentLoaded 이벤트 발생 직전에 스크립트가 실행된다.
- 만약 여러개의 defer script가 있다면, 코드에 작성된 순서대로 script 태그가 실행된다. 따라서 크기가 작은 defer script를 위에 쓰는 것이 성능에 중요하게 작용할 것이다.

#### 기타

- defer 속성은 (외부 스크립트를 불러오는) src 속성이 있어야만 유효하다.

## async (비동기)

```html
<script async src="script.js" />
```

#### 요약

- async 속성이 있으면, 마찬가지로 스크립트를 백그라운드에서 다운로드 한다.

#### 실행 시점

- 스크립트가 백그라운드에서 다운로드가 완료되는 즉시 script가 실행된다. script가 실행되면서 html 파싱은 멈추게 됨.
- Load-first : 만약 여러개의 async script가 있다면, 먼저 다운로드 된 스크립트가 먼저 실행된다.

#### 기타

- Google Analytics와 같이 서비스랑은 무관한 분석, 광고 관련 script에 사용하면 좋다.

## defer vs async

|                       | defer                                 | async                                                |
| --------------------- | ------------------------------------- | ---------------------------------------------------- |
| 여러 script 실행 순서 | 문서에 추가된 순서대로 실행 됨        | 먼저 load된 것 부터 실행됨 (load-first)              |
| 실행 시점             | html 파싱 이후, DOMContentLoaded 이전 | html이 모두 파싱되지 않은 상태에서도 실행될 수 있음. |

순서를 이해하기 쉬운 그림이 있어서 가져와보았다.

![](https://velog.velcdn.com/images/jiwonyyy/post/a013744c-fe61-4616-957d-175052f9f62f/image.png)

## 동적으로 추가된 script

- 이외에 `createElement()`로 동적으로 script 태그를 추가하는 방법이 있다.

```js
let script = document.createElement('script');
script.src = '/script.js';
document.body.append(script);
```

이렇게 동적으로 추가된 script 태그는 기본적으로 `async` 속성을 가진다.
그러기 때문에 위에서 언급한 async script 태그의 속성인

1. 스크립트가 다운로드 즉시 실행되며.
2. 여러 스크립트가 있을 시, 다운로드 된 순서대로 실행된다.

async 속성을 원하지 않는다면, async 속성을 false로 지정해주면 된다.

```js
script.src = '/script.js';
script.async = false;
```

script의 속성을 잘 활용하여서 웹 성능을 개선할 수 있을 것이다.

> ### Reference
>
> - https://ko.javascript.info/onload-ondomcontentloaded
> - https://ko.javascript.info/script-async-defer
