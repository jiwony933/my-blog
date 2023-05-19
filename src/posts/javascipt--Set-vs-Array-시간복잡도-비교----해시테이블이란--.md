---
  title: '[javascipt] Set vs Array 시간복잡도 비교 (+ 해시테이블이란?)'
  date: '2023-02-04'
  category: ''
  summary : 'set vs array'
---

벨로그 글을 추천받아서 읽어보았다.

> (번역) 데이터 구조를 개선하여 코드 43% 줄이기  
> [https://velog.io/@lky5697/react-junior-code-review-and-refactoring](https://velog.io/@lky5697/react-junior-code-review-and-refactoring)
>
> `배열 대신 Set로 checkedState를 사용하는 것입니다. 객체로 사용할 수도 있었지만, Set는 우리가 꽤 많이 사용하는 size에 접근하는 것과 같은 약간의 이점이 있습니다. Map과 비교하면 키-값 대신 선택한 모든 항목의 id만 알면 되기 때문에 Set이 약간 더 적합합니다.`

여러개의 체크박스들을 배열 대신, set을 사용하여 데이터 구조를 개선하라는 내용이었다.

평소에 Set을 써보지 않아서 흥미롭게 읽은 글인데, 그렇다면 Set이 뭐고, 왜 Array보다 좋은지? 에 대해서 공부해보게 되었다.

## Set

- 데이터 타입 중 하나로 중복되는 값을 가지지 않는 값들의 리스트이다.
- Javascript에서는 ES6부터 제공되었다. (JAVA의 set과 비슷한 개념)

#### Set 의 특징

- 동일한 값을 중복하여 포함할수 없다
- 요소 순서에 의미가 없다
- 인덱스로 요소에 접근할 수 없다.

```js
const set1 = new Set(); // Set(0) {}
const set2 = new Set([1, 2, 3]); // Set(3) {1, 2, 3}
const set3 = new Set([1, 2, 2, 3, 3]); // Set(3) {1, 2, 3} (중복 제거됨)
```

#### Set에서 데이터 관리 하는법

- has (값이 있는지 확인)
- add (값을 추가)
- delete (값을 삭제)
- size (데이터 개수 확인)

```js
const set = new Set([1, 2, 3]); // Set(3) {1, 2, 3}

set.has(2); // true
set.add(4); // Set(4) {1, 2, 3, 4}
set.delete(3); // Set(3) {1, 2, 4}
set.size; // 3
```

#### Set에서 array로 변환하는 방법

- spread operator를 사용하기
- Array.from() 메서드 사용하기

## Set이 왜 더 빠른가?

Set은 해시테이블 자료구조를 갖고 있다고 한다.

### 해시테이블 자료 구조란?

해쉬테이블은 (Key, Value)로 데이터를 저장하는 자료구조이다.  
키(Key), 해시함수(Hash function), 해시(hash), 값(value), 저장소(bucket)로 이루어져 있다.

![](https://velog.velcdn.com/images/jiwonyyy/post/9a01e076-74a1-4d48-a441-858e5dd120fb/image.png)

해시 테이블은 각각의 Key값에 해시함수를 적용해 배열의 고유한 index를 생성하고, 이 index를 활용해 값을 저장하거나 검색하게 된다

> #### 해시테이블 자료구조를 이해하는데에 도움이 되었던 유튜브 영상
>
> [https://www.youtube.com/watch?v=xls6jEZNA7Y](https://www.youtube.com/watch?v=xls6jEZNA7Y)

### 해시테이블 장점

- 검색 속도가 빠르다.
- 삽입, 삭제 작업이 O(1) 이기 때문에 이런 작업이 많을 때 유리하다.

### 해시 테이블의 단점

- 순서가 있는 배열에는 어울리지 않는다.
- 공간 복잡도가 높다
- 해쉬 함수의 의존도가 높다.
- 해시 충돌이 발생할 수 있음

## Array vs Set 데이터 관리 메서드 비교

### 1\. 값이 있는지 확인하기

#### Array

- `array.includes()`
- 시간 복잡도 : O(n)

#### Set

- `set.has()`
- 시간복잡도 : O(1)

### 2\. 값을 추가

#### Array

- `array.push()`
- 시간 복잡도 : O(1)

#### Set

- `set.add()`
- 시간복잡도 : O(1)

### 3\. 특정 값을 삭제

#### Array

- `array.filter()`
- 시간 복잡도 : O(n)

#### Set

- `set.delete()`
- 시간복잡도 : O(1)

### 결론 : Set을 사용하여 데이터를 관리하면 좋은 경우

- 중복된 데이터가 없는 경우
- 값이 있는지 확인, 특정 값을 삭제하는 행위가 많은 경우
