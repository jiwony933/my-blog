---
title: 'object를 복사하는 여러가지 방법과 그 차이점에 대해 알아보자 (feat. structuredClone())'
date: '2023-05-30'
category: 'javascript'
summary: 'Deep Copy, Deep+shallow Copy, shallow Copy 대체 어디까지 복사되는 걸까?'
---

객체를 복사하는 방법은 여러가지가 있다.
사용처에 따라서 알맞는 방식을 고르면 되는데, 최근에 `structuredClone()`이라는 메서드를 알게 되면서 각각의 복사 방법이 동작하는 방식에 대해서 다시 찾아보게 되었다.

우선, 여러가지 객체 복사 방식은 복사되는 깊이에 따라 얕은 복사, 깊은 복사로 흔히 나뉜다.
하지만 이렇게 이분화 하기에는 복사 방식 마다 그 차이점이 있기 때문에, 3가지로 나누는게 적절하다고 본다.

> ### 1. Shallow Copy
>
> - 참조 값만 복사되는 경우
>
> ### 2. Deep + Shallow Copy
>
> - 대표 객체는 복사, 하위 객체는 참고만 함
>
> ### 3. Deep Copy
>
> - 대표 + 하위 객체 모두 복사하는 방식

**복사할 object**

- 아래 설명을 위해서 originalObj라는 객체를 임의로 만들었다.

```js
const originalObj = {
  id: 1,
  name: 'jiwon',
  info: {
    age: 20,
    gender: 'female',
    birthday: new Date(1999, 1, 1),
    etc: new Set([1, 2, 3, 4, 5]),
  },
};
```

# Shallow Copy

## 1. `const newObject = object;`

- 새로운 복사본을 생성하지만, 원본 객체와 동일한 데이터 주소를 참조한다.
- 그렇기 때문에 newObject가 변하면 object도 변하고, object가 변하면 newObject도 변하게 된다.

```js
const originalObj = {
  id: 1,
  name: 'jiwon',
  info: {
    age: 20,
    gender: 'female',
    birthday: new Date(1999, 1, 1),
    etc: new Set([1, 2, 3, 4, 5]),
  },
};

const newObj0 = originalObj;

// 원본을 변경하면 복사본도 변경되고,
originalObj.name = 'joy';
console.log(newObj0.name); // joy

// 복사본을 변경하면 원본도 변경된다.
newObj0.info.age = 32;
console.log(originalObj.info.age); // 32
```

- newObj0에는 원본 객체 originalObj의 복사본이 할당되지만, 실제로는 두 변수가 동일한 객체를 참조한다.
- 따라서 newObj 혹은 originalObj를 변경하면 서로에게 영향을 미친다.

# Deep + Shallow Copy

## `2. Object.assign` 사용하기

- Object.assign()은 출처 객체들의 모든 속성을 복사해 대상 객체에 붙여 넣는 메서드이다.
- 하지만 복사하는 대상 객체 property의 값중 객체가 있을 경우, 이 2depth의 객체에 대해서는 참조값만 복사한다.
- 1depth까지는 새로 복사, 2depth는 참조값만 복사(값 변경 시 원본/복사본 서로 영향을 줌)

```js
const originalObj = {
  id: 1,
  name: 'jiwon',
  info: {
    age: 20,
    gender: 'female',
    birthday: new Date(1999, 1, 1),
    etc: new Set([1, 2, 3, 4, 5]),
  },
};

const newObj1 = Object.assign({}, originalObj);

// 1depth 프로퍼티는 변경해도 서로에게 영향 X
originalObj.name = 'joy';
console.log(newObj1.name); // jiwon

// 2depth 프로퍼티는 변경할 시, 원본/복사본 둘다 변경됨
newObj1.info.age = 32;
console.log(originalObj.info.age); // 32
```

## 3. 스프레드 사용하기 : `{ ...originalObj }`

```js
const originalObj = {
  id: 1,
  name: 'jiwon',
  info: {
    age: 20,
    gender: 'female',
    birthday: new Date(1999, 1, 1),
    etc: new Set([1, 2, 3, 4, 5]),
  },
};

const newObj2 = { ...originalObj };

// 1depth 프로퍼티는 변경해도 서로에게 영향 X
originalObj.name = 'joy';
console.log(newObj2.name); // jiwon

// 2depth 프로퍼티는 변경할 시, 원본/복사본 둘다 변경됨
newObj2.info.age = 32;
console.log(originalObj.info.age); // 32
```

- 스프레드 연산자를 사용하는 것과 Object.assign()을 사용하는 것은 동일하게 작동 한다.

# Deep Copy

- 원본과 복사본이 서로에게 영향을 주지 않도록 완전히 새로운 복사본을 만드는 방법을 알아보도록 하자.

## 4. `JSON.parse(JSON.stringify(obj))`

- 아무래도 깊은 복사를 할 때에 가장 많이 사용하게 되는 메서드가 아닐까 싶다.
- 이는 완전한 복사를 위해서 JSON 문자열로 바꾼 후, 다시 파싱하는 방식이다.
- 이 방식은 모든 Depth의 프로퍼티들이 완전히 복사된다.

```js
const originalObj = {
  id: 1,
  name: 'jiwon',
  info: {
    age: 20,
    gender: 'female',
    birthday: new Date(1999, 1, 1),
    etc: new Set([1, 2, 3, 4, 5]),
  },
};

const newObj3 = JSON.parse(JSON.stringify(originalObj));
```

![](https://velog.velcdn.com/images/jiwonyyy/post/5dd483f7-a93a-47bd-b067-04d37ea25b2b/image.png)

- 하지만 여기서 주의할 점은, Date 같은 경우에는 string형태로 복사되고, Set 타입 등의 데이터는 복사되지 않는 다는 것이다.

## 5. `structuredClone()` 사용하기

- HTML spec에서는 "structedClone()"이라는 깊은 복사를 위한 글로벌 메서드를 제공하고 있다.
- 특히 이 방식은, JSON 메서드에서 지원하지 않는 Date나 set 등 내장 데이터 타입도 지원하는 것을 알 수 있다.
- 예전에는 nodejs 환경에서 작동하지 않았는데, 지금은 가능

```js
const originalObj = {
  id: 1,
  name: 'jiwon',
  info: {
    age: 20,
    gender: 'female',
    birthday: new Date(1999, 1, 1),
    etc: new Set([1, 2, 3, 4, 5]),
  },
};

const newObj4 = structuredClone(originalObj);
```

![](https://velog.velcdn.com/images/jiwonyyy/post/697f6425-343e-4d72-81cd-a794ce1e5bd5/image.png)

![](https://velog.velcdn.com/images/jiwonyyy/post/178929b8-2360-482a-b782-681ad9bc1ec0/image.png)

### `JSON` 사용 vs `structuredClone()`

**공통점**

- 객체의 깊은 복사를 할 수 있음
- 함수, DOM 노드, 정규표현식, Error 객체 등은 복사 불가

**시간 비교**

- 객체 사이즈에 따라 각각의 복사 방식이 걸리는 시간이 얼마나 되는지 비교를 해보았다.

```js
// 크기가 큰 객체 생성
const largeObj = {};
const size = 10000000;
for (let i = 0; i < size; i++) {
  largeObj[`prop${i}`] = i;
}

// structuredClone()의 실행 시간 측정
const startTime = performance.now();
const clonedObj = structuredClone(largeObj);
const endTime = performance.now();

const executionTime1 = endTime - startTime;
console.log('structuredClone() 실행 시간:', executionTime1);

// JSON.parse(JSON.stringify())의 실행 시간 측정
const startTime2 = performance.now();
const clonedObj2 = JSON.parse(JSON.stringify(largeObj));
const endTime2 = performance.now();

const executionTime2 = endTime2 - startTime2;
console.log('JSON.parse(JSON.stringify()) 실행 시간:', executionTime2);
```

![](https://velog.velcdn.com/images/jiwonyyy/post/7cca6a25-ded2-41bd-ad34-640e45bf51e3/image.png)

- 작은 사이즈의 객체는 structuredClone()이 JSON 방식 보다 훨씬 오래걸렸다
- 하지만, 객체의 사이즈가 커질 수록, JSON 문자열의 길이가 길어져, 다시 파싱하는데에 걸리는 시간이 추가되어 점점 늘어났다..
- 내장 데이터 타입에 대한 복사가 필요한지, 객체의 사이즈, depth 등을 고려하여 적절한 복사 방식을 선택하면 될 것 같다.

> ### Reference
>
> https://soobing.github.io/javascript/deep-copying-objects-with-the-structuredclone-api/
