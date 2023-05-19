---
title: '사용성을 고려한 주문 정보 테이블 만들기 (useRef, focus-within 등)'
date: '2022-12-15'
category: 'client'
summary: 'UI/UX에 대해 생각해보고.. 개선하려고 노력하는 중'
---

요즘 Admin 페이지를 개발 중인데..  
Admin 페이지는 정보를 등록/수정/삭제하는 기능이 많다.

아무리 고객이 보는 것이 아니더라도,  
Admin 사용하는 직원 === 나의 고객이기 때문에  
UI/UX에 대해 열심히 생각해보고.. 개선하려고 노력하는 중

오늘 쓸 포스팅은  
기존 수령인 정보를 불러와서, 해당 테이블에서 바로 수정이 가능하도록 구현한 내용이다.

### 해당 컴포넌트를 개발하면서 중점에 뒀던 것은

> 1.  해당 테이블에서 바로 수정할 수 있게 구현하기
> 2.  수정 모드일 때, editable 한지 눈으로 보이게 구현하기

## 1\. 해당 테이블에서 바로 수정할 수 있게 구현하기

처음에는 수정 버튼을 눌렀을 때에 새로운 모달창을 띄워  
그 모달창에서 편집을 할 수 있도록 구현했었다.

하지만 사용성이 떨어진다는 피드백을 받고, (내가 생각해도 그랬음)  
해당 테이블에서 바로 수정할 수 있도록 구조를 변경하였다.

### 구현 순서

1. `<Table>`내의 `<td>`안에 `<input/>`태그 만들기
2. `useState`를 사용하여, `isEditMode`일 때를 정하기

```js
const [isEditMode, setIsEditMode] = useState < boolean > false;

// 수정 버튼을 누르면 `isEditMode`,
// 취소/저장 버튼을 누르면 `!isEditMode`가 될 수 있도록 함수 구현도 필요
```

3. `!isEditMode`일 때에는 `input` 속성의 `disabled`를 `true`로 준다.

```js
<tr>
  <th>수령인 명</th>
  <td>
    <input
      onChange={handleAddressFormChange}
      name='recipientName'
      value={userAddress.recipientName}
      disabled={!isEditMode}
    />
  </td>
</tr>
```

그렇게 되면 대략 이런 구조가 되고,  
해당 테이블에서 수정 모드가 on되면 input이 활성화되면서 바로 값을 수정할 수 있다.

## 2\. 수정 모드일 때, editable 한지 눈으로 보이게 구현하기

입력이 가능한지 확인하는 가장 간단한 방법은, input창에 커서가 깜빡이는 것이다. 하지만, 여기서 문제점은 input에 autoFocus를 주어도 잘 먹지 않는다는 점이었는데...

_**이유를 확인해보니,,  
autoFocus는 처음 화면이 렌더링 될 때 활성화 된다는 것이다.**_

그렇기 때문에 내가 만든 페이지에서는 처음(!isEditMode)에는 input이 비활성화 되어있기 때문에 autoFocus가 적용되지 않고, 수정 버튼을 클릭해봤자.. 커서가 깜빡이지 않는 것이 당연했다..

그래서 알아본 결과 `useRef`와 `useEffect`를 사용하는 방법으로 구현!

### 구현 순서

1. `useRef` 정의하기

- focus 되고 싶은 input tag에 ref속성 추가

```js
const inputFocus = useRef < any > null;

<input
  onChange={handleAddressFormChange}
  name='recipientName'
  value={userAddress.recipientName}
  disabled={!isEditMode}
  ref={inputFocus}
/>;
```

2. `useEffect`로 focus 효과 주기

- useEffect를 사용하고 의존성 배열에 isEditMode를 주어, 수정모드가 바뀔 때 마다 해당 input 창에 focus를 주도록 구현

```js
useEffect(() => {
  inputFocus.current.focus();
}, [isEditMode]);
```

### +) 예상치 못한 난관으로 새로운 CSS 지식 습득

커서도 검은색에 폰트 컬러도 검은색이고, 글씨도 그리 크지 않았기 때문에  
생각보다 _단순히 커서만 깜빡이는 것으로는 이게 입력이 가능한지? 눈에 잘 띄지 않았다_

그래서 input이 focus 되었을 때에  
해당 table cell의 background Color 자체가 바뀌면 어떨까? 라고 생각해보었다.

input이 table cell 안에 있는데 table cell을 어떻게 바꾸지?

.. 다 방법이 있었다.. 그것은 바로 `:focus-within`

> ### :focus-within
>
> 해당 엘리먼트나, 해당 엘리먼트의 자식이 focus 되었을 때의 CSS를 변경
>
> (공식문서 내용)  
> The :focus-within CSS pseudo-class matches an element if the element or any of its descendants are focused. In other words, it represents an element that is itself matched by the :focus pseudo-class or has a descendant that is matched by :focus. (This includes descendants in shadow trees.)

```js

  td {
    padding: 12px;
    vertical-align: middle;
    border: 1px solid var(--grey300);
    white-space: nowrap;

    :focus-within {
      background-color: var(--blue50);
      transition: all 0.2s;
    }
  }

```

- `table` 태그의 `<td>`의 속성을 위와 같이 주었더니  
  `<td>` 내부의 `input`이 focus되었을 때에 해당 `<td>`에 CSS 효과가 적용되었다!
  그렇게 하여 완성..

![](https://velog.velcdn.com/images/jiwonyyy/post/41c5077a-547b-4e87-80ab-d305ff19fe35/image.gif)

### 느낀 점 😀

이번 컴포넌트를 만들면서, 단순히 기능 구현하고 끝~! 이라기 보단  
고객들이 내 제품을 사용했을 때에 별도의 노동 없이 아주 직관적으로 제품을 이해할 수 있는 UI/UX를 항.상. 생각하며 만들어야겠다고 느꼈다.

그리구 useRef, focus-within 등을 처음 사용해보아서 재밌(?)었다.
