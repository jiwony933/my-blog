---
title: 'Styled-component에서 props 똑똑하게 넘겨주기'
date: '2023-07-29'
category: 'client'
summary: 'Warning: Received `true` for a non-boolean attribute `{props 명}`. $prefix를 사용해보자! '
---

styled-component를 사용하다가

```
Warning: Received `true` for a non-boolean attribute `{props 명}`.
```

위와 같은 에러를 마주쳤다.

어디서 문제가 발생했는지 찾아보니, 만들어 두었던 `<TextDiv>`라는 `common component`였다.

```js
<TextDiv nowrap>상세 내용</TextDiv>
```

TextDiv는 컬러, 사이즈, 폰트 굵기, wrap 여부 등을 props로 받아서 Text가 들어간 div를 커스텀 할 수 있는 컴포넌트였는데, 저 props 중에서 `nowrap`이 에러의 원인이었다.

```js
import styled from 'styled-components';

export interface TextDivProps {
  color?: string;
  size?: number;
  weight?: number;
  nowrap?: boolean;
}

export const TextDiv =
  styled.div <
  TextDivProps >
  `
  color: ${({ color }) => (color ? color : 'black')};
  font-size: ${({ size }) => (size ? size : 14)}px;
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  white-space: ${({ nowrap }) => (nowrap ? 'nowrap' : 'normal')};
`;
```

`nowrap`은 non-boolean attribute인데, true, false인 boolean 값으로 받았다는 내용의 에러이다.

## 왜 warning이 발생했을까??

### 1) 표준, 비표준에 대한 문제

기본적으로 HTML 시멘틱 태그는 width, height, id 등등 다양한 속성을 가지고 있다.
이러한 속성들을 우리는 `HTML 표준 속성`이라고 부를 수 있다.

> HTML 표준속성
> https://developer.mozilla.org/ko/docs/Web/HTML/Attributes
> 표준 속성이 아닌 것들은 비표준 속성이라고 할 수 있다.

예를 들어서 `alt={true}`등 과 같이, string으로 전달해주어야 하는 표준 속성을 boolean으로 전달하게 되면 non-boolean attribute warning이 발생할 것이다.

### 2) 비표준 속성인데 에러가 나는 것들?

styled-component 공식문서를 확인하면, 다음과 같은 내용을 확인할 수 있다.

> Styled-component Passed Props
> https://styled-components.com/docs/basics#passed-props

> If the styled target is a simple element (e.g. styled.div), styled-components passes through any known HTML attribute to the DOM. If it is a custom React component (e.g. styled(MyComponent)), styled-components passes through all props.
> Note how the inputColor prop is not passed to the DOM, but type and defaultValue are. That is styled-components being smart enough to filter non-standard attributes automatically for you.

실제 DOM 엘리먼트에 전달하기 전에, styled-components 내부에서 비표준 속성을 자동으로 필터링하고 있다는 것을 알 수 있다.

![](https://velog.velcdn.com/images/jiwonyyy/post/5afc257b-e7fd-4522-b0ad-56b1f7a3cf94/image.png)

아래 링크에서 필터링 되는 비표준 속성에 어떤 것들이 있는지 확인할 수 있다.

https://github.com/emotion-js/emotion/blob/main/packages/is-prop-valid/src/props.js

### 3) nowrap은 2번에 해당안되는데 왜 안되는데?

nowrap은 비표준 속성이고, 2번의 styled-component에서 필터링 하는 attribute이름도 아니지만, 왜 에러가 발생하는 걸까?

nowrap 같은 속성은 CSS의 white-space 속성에 해당하며, HTML의 표준 속성은 아니지만 DOM에 직접 적용될 수 있는 경우가 있다. 이런 경우에는 styled-components에서도 이 속성을 DOM으로 전달하려고 시도하려고 할 수 있다.

그런데 이를 boolean 값으로 전달하려고 하는 상황에서 경고 메세지가 발생했을 수 있다.

## 해결하는 방법

### 1. DOM으로 전달되지 않는 props 명으로 대체한다.

- noWrap => isNoWrap 등으로 변경하여 사용하기

### 2. (추천) prefix를 사용한다. (styled-components 5.1v 부터 사용 가능)

- prefix '$'를 사용하게 되면, props 가 실제 DOM 요소에 전달되는 것을 막는다.
- noWrap => $noWrap

> ### Transient props v5.1
>
> If you want to prevent props meant to be consumed by styled components from being passed to the underlying React node or rendered to the DOM element, you can prefix the prop name with a dollar sign ($), turning it into a transient prop.

## 왜 prefix를 사용하는 것이 좋을까?

1. 성능 최적화:
   styled-components를 사용할 때는 불필요한 속성이 DOM에 전달되는 것을 최대한 방지하는 것이 중요하다. DOM에 불필요한 속성이 전달되면, 웹 브라우저는 해당 속성을 해석하고 처리해야 하기 때문에 성능 저하의 원인이 된다.

2. 스타일 가독성 및 유지보수성:
   컴포넌트를 스타일링할 때 사용하는 속성 이름이 DOM에 전달되는지 여부를 명확하게 구분하는 것은 코드의 가독성과 유지보수성을 높여준다. prefix를 사용함으로써, 스타일이 적용되는 속성과 실제로 DOM에 전달되는 속성을 명확하게 구분할 수 있다.

3. 코드 충돌 방지:
   만약 styled-components에서 사용하는 속성과 브라우저에서 지원하는 비표준 속성 이름이 충돌한다면, 예상치 못한 동작이 발생할 수 있고, 이를 방지하기 위해 prefix를 사용하거나, DOM으로 전달되지 않는 다른 속성으로 대체함으로써 충돌 가능성을 줄일 수 있다.

> References
> https://mygumi.tistory.com/382
