---
title: 'puppeteer를 사용한 웹사이트 스크래핑 - 2) 퍼펫티어 유용한 method!'
date: '2023-04-08'
category: ''
summary: '퍼펫티어에서 가장 많이 사용했던 method들을 정리해봄!'
---

오늘은 지난주에 이어 퍼펫티어를 이용한 스크래핑에 대해서 포스팅을 써봐야지  
이번에는 퍼펫티어에서 가장 많이 사용했던 method들을 정리해보고자 한다!

## 1\. Page 열기

### 1) 브라우저 실행

#### launch()

```js
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
```

- 브라우저를 실행시키는 메소드이다.
- 퍼펫티어에서는 headless를 true/false로 설정할수 있다  
  \- headless : false로 설정하면 브라우저가 켜져서 스크래퍼가 동작하는걸 실시간으로 볼 수 있음

### 2) 페이지로 이동

#### newPage(), goto()

```js
const page = await browser.newPage();
page.setViewport({ width: 1200, height: 1000 });
await page.goto(TARGET);
```

- 위에서 실행시킨 브라우저에서 원하는 페이지로 이동한다.
- 초기에 세팅된 viewport 말고 원하는 사이즈로 오픈 가능  
  (반응형인 웹페이지의 경우 뷰포트 세팅도 중요할 듯)

## 2\. Page 조작하기

우선 시작전에 스크래핑에서 페이지를 조작할 때 셀렉터를 매우 많이 사용하게 되는데 셀렉터를 쉽게 확인하는 방법은 개발자 도구에서 copy selector를 하면 끝! 처음에는 이 방법을 몰라서 꽤나 고생했다 ㅜ..  
![](https://velog.velcdn.com/images/jiwonyyy/post/f216d077-92a1-4a1f-995b-7f5ac026786b/image.png)

### 1) 특정 요소 로딩 대기

#### waitForSelector()

```js
await page.waitForSelector('.item > h1', { timeout: 10000 });
```

- 특정 요소가 로딩될 때까지 대기하는 메소드이다.
- 첫 번째 매개변수로 CSS selector를 써주면 됨
- 타임아웃 설정을 할 수 있으며, 기본값은 30000ms(30초)이다.
- 타임아웃으로 지정된 시간이 지나도 seletor가 나오지 않으면, 에러 메세지를 띄워준다
- 클릭할 요소가 아직 뜨지 않았는데 click 등을 실행하면 에러가 발생하기 때문에 waitForSelector가 꽤나 자주 사용됨.

#### waitForXPath()

- selector로 찾아지지 않는 요소들은 Xpath로 검색하는 것이 좋다.
- 예를 들면 `'제품'이라는 단어가 포함된 버튼`을 기다려야 하는 경우는 아래와 같이 XPath로 요소를 찾아주는 걸 추천!

```js
await page.waitForXPath(`//h2[contains(text(), "제품")]`);
```

### 2) 버튼 클릭

#### click()

```js
await page.click('#target-element');
```

- 특정 요소를 클릭하는 메소드이다.
- 첫 번째 매개변수로 CSS selector를 써주면 됨

#### xpath로 찾은 요소를 클릭하는 방법

- $x() : XPath를 사용하여 엘리먼트를 선택하는 메서드이다.
- 결과가 배열형태로 반환된다는 점 주의

```js
await skuPage.waitForXPath(`//h2[contains(text(), "제품")]`);
const productDetailButton = await skuPage.$x(`//h2[contains(text(), "제품")]`);
if (productDetailButton.length > 0) await productDetailButton[0].click();
```

### 3) select - option 선택

```js
await page.select('#target-select', 'option-value');
```

- select요소에서 원하는 옵션을 선택하는 메소드이다.
- 첫 번째 매개변수로 CSS selector, 두번째로 원하는 option의 value를 쓴다.

![](https://velog.velcdn.com/images/jiwonyyy/post/1d3b06dc-cda6-4ade-a45d-f061b4cc4eae/image.png)

### 4) 페이지에서 javascript 실행하기

#### evaluate()

- 페이지 안에서 javascript로 document.querySelectorAll()등을 사용하려면 evaluate method를 사용해주어야 한다!

```js
const productLinks = await page.evaluate(() => {
  const selector = '.product-tile__image';
  const links = Array.from(document.querySelectorAll(selector)).map(
    (el) => 'https://www.fritzhansen.com' + el.getAttribute('href')
  );

  return links;
});
```

## 3\. Page 닫기

```js
await page.close();
await browser.close();
```

- 페이지 조작이 끝나면 페이지와 브라우저를 닫아준다

할 때는 이것저것 찾아보느라 힘들었는데 정리하고 나니깐 왤케 별거 없어보이는지!

진짜 이 메소드들만 알면 스크래핑 끝 ㅡㅡ!이라고 할 수 있겠다.  
그 뒤로는 스크랩한 데이터만 잘 가공하면 됩니다! 화이팅!🥳
