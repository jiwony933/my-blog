---
title: '웹 최적화 2) intersection Observer를 알아보자! '
date: '2023-06-24'
category: 'client'
summary: '대상을 쭉 관찰하다가.. 발견되는 즉시 함수를 실행시키는!'
---

웹 성능 향상을 위해 꼭 알아야 하는 Intersection Observer에 대해서 포스팅을 해보고자 한다.

## Intersection Observer란?

IntersectionObserver는 브라우저의 뷰포트와 대상 요소의 교차 상태를 관찰하는 JavaScript API이다.
IntersectionObserver를 사용하면, 웹 페이지의 특정 요소를 관찰하면서, 페이지 스크롤 시 해당 요소가 화면에 들어왔는지 아닌지를 알려준다.

### 스크롤 이벤트와의 차이점은?

스크롤 이벤트를 사용하는 경우가 많은데, 스크롤 이벤트는 스크롤이 발생할 때마다 함수를 호출하지만, IntersectionObserver는 요소가 화면에 들어왔을 때에만 함수를 호출하기 때문에 성능적으로도 훨씬 우수하다.

## Intersection Observer를 사용하는 경우

- 레이지 로딩: 이미지와 같은 큰 리소스를 뷰포트에 진입할 때 로드하기
- 무한 스크롤: 스크롤이 특정 영역에 도달하면 새로운 콘텐츠를 동적으로 로드
- 광고 추적: 광고가 뷰포트에 보이는지 여부를 감지하여 광고 효과를 추적하기
- 애니메이션 트리거: 요소가 뷰포트에 들어올 때 애니메이션을 실행하기

## Intersection Observer 사용법

```js
let observer = new IntersectionObserver(callback, options);

const options = {
  root: null, // 뷰포트를 루트로 설정
  rootMargin: '0px', // 뷰포트의 마진 없음
  threshold: 0.5, // 대상 요소의 50% 이상이 뷰포트와 교차하면 콜백 호출
};
```

IntersectionObserver 생성자를 호출하고, 콜백 함수와 options를 파라미터로 넣어서 사용하면 된다.

options에는 root, rootMargin, threshold가 있는데

- root : 뷰포트 요소, default = null,
- rootMargine : 뷰포트 요소의 마진, default = 0
- threshold : 가시성 퍼센티지 (대상의 몇퍼센트가 보일때 콜백을 실행할지), default = 0

## 활용해보자

간단하게, 스크롤을 내렸을 때 '관찰 대상'이라는 텍스트가 보일 때만 감지하는 리액트 컴포넌트를 써보았다.

```js
import React, { useEffect, useRef } from 'react';

function ObserverComponent() {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry);
        console.log('관찰 대상 보임');
      }
    });
  };

  return (
    <div>
      <div style={{ height: '2000px', backgroundColor: 'red' }}></div>
      <div ref={targetRef}>관찰 대상</div>
    </div>
  );
}

export default ObserverComponent;
```

텍스트가 보이지 않을때에는 콘솔에 아무것도 찍히지 않지만,
스크롤을 내려 텍스트가 보이는 순간 콘솔에 아래와 같은 내용이 보인다.

![](https://velog.velcdn.com/images/jiwonyyy/post/5d1a145e-5805-4027-b70a-74ee76a1f425/image.png)

콘솔의 내용을 살펴보면,

- `target`: 교차 영역을 감지한 대상 요소이다. 위 코드에서는 targetRef로 지정된 DOM 요소인
  `<div>관찰 대상</div>` 이 된다.
- `isIntersecting`: 교차 영역에 들어왔는지 여부를 나타내는 boolean 값. true일 경우 교차 영역에 들어왔음을 의미하며, false일 경우 교차 영역에서 벗어났음을 의미한다.
- `intersectionRatio`: 교차 영역의 비율을 나타내는 값. (== 몇퍼센트나 보이는지) 0은 전혀 보이지 않음, 1은 모두 보임.
- `boundingClientRect`: 대상 요소의 크기와 위치 정보를 포함하는 객체이다.
  - x, y, width, height, top, left, right, bottom 값이 뜸
- `rootBounds`: 교차 영역의 기준이 되는 뷰포트(루트)의 크기와 위치 정보를 포함하는 객체이다.
  - x, y, width, height, top, left, right, bottom 값이 뜸

### 무한 스크롤을 구현해보기

```js
import React, { useRef, useEffect, useState } from 'react';

const InfiniteScroll = () => {
  const containerRef = useRef(null);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchData();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setProduct([...product, ...data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <ProductList ref={containerRef}>
        {product.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ProductList>
    </div>
  );
};

export default InfiniteScroll;
```

이렇게 코드를 작성하면, 처음부터 모든 데이터를 불러오는 것이 아니라 observer가 `<ProductList/>` 컴포넌트를 계속 관찰하다가 `threshold: 0.5` 즉, 기존 리스트의 0.5 이상이 보이게 되면 다음 데이터를 fetch해오게 된다.

이제는 Intersection Observer를 사용하여 웹 성능을 개선하자!!!

> REFERENCE
> https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
