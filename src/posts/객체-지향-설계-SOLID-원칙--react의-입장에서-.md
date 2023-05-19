---
title: '객체 지향 설계 SOLID 원칙 (react의 입장에서)'
date: '2023-01-07'
category: ''
summary: '솔리드 원칙 솔리드원칙 .. 매번 말만 듣고, 머릿속에 정리가 안 된 상태명확한 개념을 이번에 공부하면서 확실히 정리해보고자 포스팅을 합니다.'
---

솔리드 원칙 솔리드원칙 .. 매번 말만 듣고, 머릿속에 정리가 안 된 상태  
명확한 개념을 이번에 공부하면서 확실히 정리해보고자 포스팅을 합니다.

> ### SOLID 원칙
>
> 1.  SRP(단일 책임 원칙)
> 2.  OCP(개방-폐쇄 원칙)
> 3.  LSP(리스코프 치환 원칙)
> 4.  ISP(인터페이스 분리 원칙)
> 5.  DIP(의존 역전 원칙)

SOLID 원칙에 기반한 개발을 하게 되면,  
프로그램의 유지보수가 편해지고, 프로그램 확장성을 높일 수 있다.

특히 프론트의 경우에는 코드 변경될 일이 매우 많기 때문에, 코드를 수정했을 때에 기존의 코드를 읽기 쉽고 변경하기 쉽게 작성하는 것이 매우 중요하다.

각각의 원칙에 대해서 알아보자 (리액트를 기반으로 이해해봄)

### 1\. SRP 단일 책임 원칙

> #### Single Responsibility Principle
>
> 어떤 클래스를 변경해야 하는 이유는 오직 하나뿐이어야 한다.

모든 함수, 컴포넌트 등은 정확히 한 가지 작업을 수행해야 한다.

#### React에 적용 가능한 방향

- 너무 많은 작업을 수행하는 컴포넌트는 컴포넌트를 분리하기
- 주요 컴포넌트 기능과 관련 없는 함수는 별도의 utils로 추출
- 연결된 기능은 custom hook 등으로 캡슐화 시키기

### 2\. OCP 개방-폐쇄 원칙

> #### Open/Closed Principle
>
> 소프트웨어 요소는 확장에는 열려있으나, 변경에는 닫혀있어야 한다.

원본 소스 코드를 변경하지 않고 확장할 수 있는 방식으로 컴포넌트를 구조화 하는 것이 좋다.  
조건에 의해 컴포넌트의 내부 로직이 계속해서 변경된다면 위험할 수 있다.

부끄럽지만 내가 작성한 아주 안좋은 코드의 예시..

![](https://velog.velcdn.com/images/jiwonyyy/post/70c24828-a2a8-440c-b9f3-44ced6626261/image.png)

대략적인 설명을 하자면,  
additional info를 하나의 객체로 관리하기 위해서 여러개의 input 창에 동일한 handleAdditionalInfoChange라는 함수를 쓰고 싶었고,  
mileage, amount의 경우에는 number형태로 저장되어야 되기 때문에 함수 안에 직접 조건을 넣어주는 끔찍한 코드를 작성 했는데..

그렇다면, 숫자로 변환되어야 하는 price라는 nubmer를 받는 input창이 또 추가되면 나는 저 함수를 직접 수정해야하는 문제가 발생한다.

```js
if (e.taget.type === "number")
if (e.target.type === "text")
```

input창이 추가되더라도 기존의 함수를 변경하지 않아도 될 것이다  
(기존 interface에 정의된 타입을 가져오고 싶은데, 이 부분은 아직 알아내지 못해서 .. 차주에 알아내어 추가 예정)

### 3\. LSP 리스코프 치환 원칙

> #### Liskov Substitution Principle
>
> 프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서, 하위 타입 인스턴스로 변경할 수 있어야 한다.

클래스를 거의 사용하지 않는 리액트에서는 적용할 것이 별로 없다라고 합니다..

### 4\. ISP 인터페이스 분리 원칙

> #### Interface Segregation Principle
>
> 범용 인터페이스 하나 보다, 인터페이스를 분리하는 것이 낫다.

인터페이스를 적절히 분리하게 되면, 한 컴포넌트에 생긴 문제가 다른 컴포넌트에 미치는 문제도 막을 수 있다.

컴포넌트는 사용하지 않는 props에 의존해서는 안된다.

```null
// before

   <h2>주문정보</h2>
     <RecipientInfo orderItems={order} />
     <OrderInfo orderItems={order} />
```

하나는 배송지에 대한 정보이고  
하나는 주문에 대한 정보인데 둘다 order를 props로 전달하고 있다.

```null
// after

   <h2>주문정보</h2>
   <RecipientInfo
     recipientName={order.recipientName}
     recipientPhoneNumber={order.recipientPhoneNumber}
   />
   <OrderInfo
     createdAt={order.createdAt}
     amount={order.amount}
     usedMileage={order.usedMileage}
   />
```

각각의 컴포넌트에서 사용할 정보만 분리하여 props로 전달해주는 것이 훨씬 바람직해 보이고, 상위에서 코드를 읽을 때에도 각각의 컴포넌트가 어떤 것들을 보여주는 컴포넌트인지 확인하기 쉬울 것으로 판단 된다.

### 5\. DIP 의존성 역전 원칙

> #### Dependency Inversion Principle
>
> 추상화된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화된 것에 의존해야 한다.

한 컴포넌트가 다른 컴포넌트에 직접적으로 의존해서는 안 되며,  
둘 다 공통된 추상화에 의존해야 합니다.

세부 구현에 의존하지말고 인터페이스를 만들어서 의존하게 한다.

- 컴포넌트가 api 모듈 등에 직접적으로 의존하지 않고, props로 주입 받아서 사용하기

마지막으로 리액트 공식문서를 읽다가 마지막 부분이 인상깊어서 캡처하여 첨부..  
![](https://velog.velcdn.com/images/jiwonyyy/post/f7e49f45-28f6-454a-a901-cee0938d49a6/image.png)

코드는 쓸 일 보다 읽을 일이 많다는 사실  
그리고 내가 지금 그냥 넘어가는 내 스스로도 불편한 코드들이.. 나중에는 snow ball처럼 나한테 굴러오지 않도록 항상 원칙에 의거한 코드를 작성해야겠다~ 라고 다짐!

> ### Reference
>
> [https://medium.com/dailyjs/applying-solid-principles-in-react-14905d9c5377](https://medium.com/dailyjs/applying-solid-principles-in-react-14905d9c5377)  
> [https://ko.reactjs.org/docs/thinking-in-react.html](https://ko.reactjs.org/docs/thinking-in-react.html)

\*\* 예시 코드에 대한 부분은 생각날 때 마다 추가하겠습니다
