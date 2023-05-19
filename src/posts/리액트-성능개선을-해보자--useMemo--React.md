---
title: '[리액트 성능개선을 해보자] useMemo, React.memo'
date: '2023-01-21'
category: 'client'
summary: 'memoization을 배워 성능 개선을 해봅시다..마치, 예전에 풀었던 문제가 똑같이 시험에 나오면, 다시 처음부터 계산하지않고 답만 적어서 시간을 아끼는 것 처럼!'
---

### Memoization이란?

- 이미 계산해본 연산 결과를 기억해두었다가, 동일한 계산을 하였을 때에 다시 계산하지 않고, 기억해두었던 데이터를 반환하는 것
- 마치, 예전에 풀었던 문제가 똑같이 시험에 나오면, 다시 처음부터 계산하지않고 답만 적는 것 처럼!

> ### useMemo, React.memo를 사용하여 memoization을 해보자

시작 전에, 간단히 useMemo와 React.memo의 차이점을 말하자면

- useMemo : 리액트 hook (값을 return), 함수형 컴포넌트에서만 사용 가능
- React.memo : 고차 컴포넌트(HOC) (컴포넌트를 return), 함수형, 클래스형 모두 사용 가능

공통점은 ? props가 변하지 않으면 재실행 하지 않고, 이전에 메모해둔 값을 반환한다 (=> 불필요한 연산/렌더링을 하지 않아 성능 개선)

# useMemo

- return 값을 가지고 있는 연산 함수인데, 특정 값이 변화할때만 연산을 수행하고 싶다면?
- memo하고 싶은 부분을 `useMemo()`로 감싸주면 된다

```js
const getAnalysis = () => {
  return;
};

// 값을 사용할 때 getAnalysis()
```

```js
const getAnalysis = useMemo(() => {

return
}, [dependency array])

// 값을 사용할 때 getAnalysis

```

- 모양새가 useEffect와 비슷하고, dependency array에 따라 함수가 재실행된다는 점에서 useEffect와의 차이점을 찾아보았다

> ### useMemo vs useEffect?
>
> useMemo는 함수가 무거운 경우 렌더링마다 계산하는 것은 처리 시간이 오래 걸리므로 값을 기억해놓고 의존성이 변경되었을 경우에만 다시 계산해주는 기능
>
> useEffect의 경우는 한 번만 호출해도 될 기능들이 렌더링되어 실행되거나, 호출과정에서 렌더링에 영향을 끼칠 수 있는 것을 모아서 따로 처리하기 위한 기능
>
> ### 둘의 가장 큰 차이점은 useEffect는 해당 컴포넌트의 렌더링이 완료된 후에 실행되지만, useMemo는 렌더링 중에 실행되어진다는 것
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/57a9151d-f619-4fab-ab20-60dfa0a88de1/image.png)
>
> 리액트 공식문서에 의하면 상황에 맞게 적절한 기능을 사용하는 것이 중요하다

# React.memo

- 간단히 말하면 함수형 컴포넌트에게 업데이트 조건을 다는 것
- 부모컴포넌트가 리렌더링 되면, 자식컴포넌트들도 리렌더 되기 때문에 리렌더가 필요없는 다른 자식 컴포넌트까지 리렌더링 되는 경우 있는데 => 불필요하게 리렌더링 되는 컴포넌트의 크기가 클 수록 성능 저하가 심해질 것이다.  
  \-> 자식 컴포넌트들 한테 각각 언제 렌더링을 시킬 지, 렌더링 되는 업데이트 조건을 걸어두기

#### \[요약\]

- 똑같은 props를 받으면 똑같은 걸 내놓겠다(리렌더링 하지 않겠다)
- 다만, 컴포넌트 안에서 구현한 state나 context가 변할때에는 리렌더링 됨

#### \[사용방법\]

```js
// 1) export 할 때 감싸주기
export default React.memo(component);

// 2) 컴포넌트 만들 때 감싸주기
const MyComponent = React.memo((props) => {
	return (/*컴포넌트 렌더링 코드*/)}
);
```

> ### 중요한 것
>
> props가 object인 경우 얕은 비교를 하기 때문에, 같은 객체가 들어가더라도 리렌더링이 발생하게 된다.
>
> 이를 위해서는 React.memo의 두번째 인자에 areEqual이라는 비교함수를 넣어서, 기존의 props와 새로운 props의 값을 비교해주는 방법을 사용하면 된다.
>
> ```js
> const MyComponent  = (props) => {
>   return (/*컴포넌트 렌더링 코드*/)
> }
> const areEqual = (prevProps, nextProps) {
>   /*
>   전달되는 nextProps가 prevProps와 같다면 true, 같지 않다면 false
>   ex) 예를 들면  */
>   return prevProps.id === nextProps.id
> }
> export default React.memo(MyComponent, areEqual);
> ```

언제 쓰면 좋을까?

- 한 컴포넌트를 같은 props로 리랜더링하는 경우가 빈번할 때 사용
- 특히 컴포넌트가 무겁고, props가 자주 변경되는 경우는 React.memo()를 사용할 경우 비교하는 과정만 추가되어, 성능 개선에 아무런 도움이 되지 않을 수 있음
