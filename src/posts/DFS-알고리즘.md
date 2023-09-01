---
 title: '[알고리즘] DFS 알고리즘(깊이 우선 탐색)'
 date: '2023-09-01'
 category: 'algorithm'
 summary: 'DFS 알고리즘은 시작점에서 출발해 가능한 멀리까지 간 후에 다시 돌아와서 다른 방향을 탐험하는 방식이다.'
---

DFS는 '깊이 우선 탐색(Depth First Search)'이다.

## 이해하기

DFS 알고리즘은 시작점에서 출발해 가능한 멀리까지 간 후에 다시 돌아와서 다른 방향을 탐험하는 방식이다.

미로에서 길을 찾는다고 생각할 때, 시작점에서 한 방향으로 계속 직진한다. 가능한 멀리까지 갈 수 있을 때까지 계속 가다가 더 이상 갈 수 없으면 다시 뒤로 돌아오고, 다른 방향으로 갈 길이 있는지 찾아본다. 이걸 계속 반복하면 결국 모든 길을 다 돌아다니면서 길을 찾을 수 있다.

### DFS 탐색 순서

1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7
![](https://velog.velcdn.com/images/jiwonyyy/post/0c4a1531-02fd-45f0-8fed-027dff272d18/image.png)

## 사용

- 모든 노드를 방문하고자 하는 경우에 DFS 알고리즘을 사용한다.
- 트리나 그래프와 같은 비선형 자료구조에서 많이 사용된다.

## 구현

### - 스택 자료구조를 이용하여 구현하는 방법

```js
function dfsUsingStack(graph, start) {
  const stack = [start]; // 시작 노드를 스택에 넣음
  const visited = []; // 방문한 노드를 기록하기 위한 Array

  while (stack.length > 0) {
    const current = stack.pop();

    if (!visited.includes(current)) {
      visited.push(current);
      console.log(current);

      graph[current].forEach((neighbor) => {
        if (!visited.includes(neighbor)) {
          stack.push(neighbor);
        }
      });
    }
  }
}

// 그래프의 인접 리스트 표현
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

dfsUsingStack(graph, 'A'); // 시작 노드 'A'에서 DFS 시작
```

### - 재귀를 이용한 구현 방법

```js
function dfsUsingRecursion(graph, current, visited) {
  visited.push(current);
  console.log(current);

  graph[current].forEach((neighbor) => {
    if (!visited.includes(neighbor)) {
      dfsUsingRecursion(graph, neighbor, visited);
    }
  });
}

// 그래프의 인접 리스트 표현
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

const visited = [];
dfsUsingRecursion(graph, 'A', visited); // 시작 노드 'A'에서 DFS 시작
```

## DFS 장점

- 구현이 쉬움
  - DFS는 스택 또는 재귀 함수를 이용해 구현하기 간단하다.
- 깊은 곳을 먼저 탐색한다.
  - DFS는 한 경로를 가능한 깊게 탐색하므로 깊이에 중점을 둔 정보를 찾을 때 유용하다.
- 적은 메모리 사용
  - 대개 스택을 사용하며 스택의 깊이가 제한되므로 메모리 사용이 적다.

## DFS 단점

- 무한 루프 위험
  - DFS는 미방문 노드 중 하나를 선택하여 이동하는데, 그래프에 순환 경로가 있을 경우 무한 루프에 빠질 수 있습니다. 방문한 노드를 기록하고 중복 방문을 피해야 한다.
- 최단 경로 보장 어려움
  - DFS는 경로 하나를 탐색하다가 목표 노드를 찾으면 중단하기 때문에 최단 경로를 보장하지 는 않는다.
- 깊은 부분이 많을 때 비효율적일 수 있음
  - DFS는 깊이가 깊은 경우 모든 가능한 경로를 검색하여 느릴 수 있습니다. 이럴 때는 BFS가 더 효율적입니다.
