---
title: 'Why Typescript?'
date: '2022-11-26'
category: 'cs'
summary: '타입스크립트에 대해서 정리해보기!'
---

> ### true일까 false일까?
>
> ```js
> console.log('3' == 3);
> ```
>
> `javascript`에서는 `true`이지만, `typescript`에서는 `false`이다.
>
> 에러메세지는 아래와 같다.  
> (string과 number은 overlap이 없기 때문에 항상 false를 반환할 것)  
> ![](https://velog.velcdn.com/images/jiwonyyy/post/0b242506-4dd4-4f60-baff-30d65a3e923a/image.png)

## Typescript가 뭘까?

### 우선 Type System이란?

값, 표현식, 함수, 모듈 등을 분류하는 규칙의 집합이다.  
보다 형식적으로는, *`"계산될 값을 분류하여 특정한 종류의 프로그램 오류가 일어나지 않음을 증명하는 계산 가능한 방법"`*으로 정의된다.

### Type Script

![](https://velog.velcdn.com/images/jiwonyyy/post/8338228b-4038-4ece-99c1-088dce780be5/image.png)

타입스크립트는 일반 자바스크립트로 컴파일이 되는 자바스크립트의 상위 호환언어라고 할 수 있는데, ‘Type’이라는 이름에서도 알 수 있듯이 강한 타입 시스템을 사용한다.

javascript는 선언할때 자료형을 굳이 명시하지 않아도 된다.  
하지만 typescript는 변수 옆에 number라고 자료형을 명시해야만 한다. 이걸 바로 type이라고 한다. javascript와 typescript의 가장 핵심적인 차이는 **_type이 있느냐 없느냐_**이다. Typescript는 변수에 타입을 선언할 수 있다(해야만 한다.)

```js
// javascript
const addWithJs = (a, b) => a + b;
// typescript
const addWithTs = (a: number, b: string) => a + b;
```

![](https://velog.velcdn.com/images/jiwonyyy/post/fb0046d8-4e3a-456f-b52f-751457c0b22d/image.png)

지정된 타입에 맞지 않게 코드를 작성하면, 위와 같이 VScode에서 에러를 띄워준다. (Typescript의 장점 중 하나는 VScode와 호환성이 매우 좋다는 점, 뒷쪽에 설명 할게요)

### 타입스크립트 동작 방식

> 1.  개발자가 '타입스크립트 코드'로 작성을 한다
> 2.  작성한 타입스크립트 코드는 '타입스크립트 컴파일러(tsc)'를 통해 파싱하여 '타입스크립트 AST 코드'로 변환된다.
> 3.  '타입 검사기(Typechecker)'를 통하여 파싱 된 '타입스크립트 AST 코드'의 타입을 체크한다.
> 4.  타입스크립트 AST의 코드를 '자바스크립트 코드'로 변환한다.

\-- 해당 과정까지는 '타입스크립트 컴파일러(tsc)'에 의해 수행이 된다.

> 5.  자바스크립트 코드를 '자바스크립트 AST 코드'로 파싱한다.
> 6.  자바스크립트 AST를 '바이트 코드'로 변환된다.
> 7.  런타임(runtime)이라는 실행환경에서 바이트 코드를 실행한다.

\-- 해당 과정까지는 '자바스크립트 런타임(js 엔진, node.js)'에 의해 수행이 된다.

요약을 하자면,

> TS → (컴파일(트랜스파일)) → JS → (실행)

### Typescript VS Javascript

#### Typescript는 정적 타입 언어

'타입' 즉 자료형을 컴파일 시에 결정하는 것  
ex) C, C#, C++, Java  
이 언어들은 변수에 들어갈 값의 형태에 따라 자료형을 지정해줘야 한다.  
자료형에 맞지 않은 값이 들어있으면 컴파일 에러가 발생한다.  
타입 에러로 인한 문제점을 초기해 발견할 수 있어 타입의 안정성이 보장된다.

#### javascript는 동적 타입 언어

동적 타입 언어의 자료형은 컴파일시 자료형을 정하는 것이 아니고 실행 시에 결정한다.  
ex) javaScript, Ruby, Phthon  
런타임까지 타입에 대한 결정을 끌고 갈 수 있기 때문에 많은 선택의 여지가 있다. 다만, 실행도중에 변수에 예상치 못한 타입이 들어와 Type Error를 발생시킬 수 있다

## TypeScript의 장점

### 1\. 정적 타입 지원

typescript를 사용하는 가장 큰 이유 중 하나는 정적타입을 지원한다는 것. 이말은 컴파일단계에서 오류를 포착할 수 있고 명시적인 정적타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있다. 이는 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 한다.

### 2\. IDE와 결합성

Visual Studio Code(이하 vsc)와의 궁합이 엄청나다. TypeScript로 상상할 수 있는 모든 개발환경을 너무나 쉽게 구축 가능하다. 코드 피드백을 매우 잘 해주는데 특정 함수에서 어느 부분이 틀리게 작성되었다고 지적하는 것은 기본이고, 심지어 JQuery 함수에서 인수 갯수를 잘못 적어주어도 그 부분이 틀렸다고 바로 알려주기도 한다.

## TypeScript의 단점

사실 단점은 크게 단점이라고 할 수 없고,, 다소 귀찮은 부분이 조금 있다

#### 1\. 복잡한 세팅

- 초기에 tsconfig.json을 통해 설정을 해주어야 함
- 라이브러리 사용 시 type버전 라이브러리를 사용해야하는 경우도 있음

#### 2\. 코드 작성 시 불편함

- 타입 추론이 되는 부분 외에는 타입을 정의해주어야 함.

`Typescript`를 처음 사용할 때에는 수많은 에러에 봉착하며,  
_아..자바스크립트였으면 더 쉬웠을텐데..._ 했었지만  
지금은 타입스크립트의 장점을 조금씩 몸소 느끼는 중이다..

다음번에는 타입스크립트를 사용하면서 겪었던 타입 에러에 대해서 정리해봐야지
