---
title: '[코딩테스트 풀기] week 1 (1) twoSum 함수 만들기'
date: '2022-08-29'
category: 'algorithm'
summary: '배열의 두 수를 더했을 때 조건을 만족하는 index 찾기'
---

## 문제

> twoSum함수에 숫자배열과 '특정 수'를 인자로 넘기면, 더해서 '특정 수'가 나오는 index를 배열에 담아 return해 주세요.
>
> ```js
> fuction twoSum (arr, target) {return [ num , num ]}
> ```
>
> ### 조건
>
> arr : 숫자 배열  
> target : 두 수를 더해서 나올 수 있는 합계  
> return : 두 수의 index를 가진 숫자 배열
>
> ### 예시
>
> arr은 \[4, 9, 11, 14\] target은 13  
> arr\[0\] + arr\[1\] = 4 + 9 = 13 이죠?  
> 그러면 \[0, 1\]이 return 되어야 합니다.
>
> ### 가정
>
> target으로 보내는 합계의 조합은 배열 전체 중에 2개 밖에 없다고 가정하겠습니다.

### 생각한 방식

1.  _**\[포기한 방법\]**_ for 문으로 arr에 포함된 요소 2가지를 더하는 경우의 수를 모두 구한 다음에 target과 일치하는 값 찾는다?  
    ➡️ 이중 for문을 돌려야 하는데, 이중 for문은 arr가 길어지면 속도가 느려질 수 있으므로 최대한 자제 하고 싶었음.
2.  _**\[선택한 방법\]**_ target에서 arr\[i\]를 뺀 값을 arr 에서 찾으면 된다?  
    ➡️ 불필요한 추가 for문 계산이 생략될 수 있음.  
    ➡️ `for` 문, `indexOf` 사용

### 작성한 코드

#### 풀이 1)

> ```js
> const twoSum = (arr, target) => {
>   for (i = 0; i < arr.length; i++) {
>     let answer = [];
>     if (arr.indexOf(target - arr[i]) > -1) {
>       answer.push(i);
>       answer.push(arr.indexOf(target - arr[i]));
>       return answer;
>     }
>   }
> };
> ```
>
> - 이 방식으로 풀 때 처음에 return의 위치때문에 빈 배열이 반환되어서, 헤맸었다.
> - 처음에 아래와 같이 코드를 작성하였는데, if 뒤에 else조건을 적지 않아서, arr\[0\] 돌 때, 조건을 달성하지 않으면 바로 \[ \] 빈 배열이 return 되었다.
>
> ```js
> // 처음에 잘 못 작성한 코드
> const twoSum = (arr, target) => {
>   for (i = 0; i < arr.length; i++) {
>     let answer = [];
>     if (arr.indexOf(target - arr[i]) > -1) {
>       answer.push(i);
>       answer.push(arr.indexOf(target - arr[i]));
>     }
>     return answer; // return의 위치가 중요했던 것이다......
>   }
> };
> ```
>
> - 구글링을 통해 클린코드를 위한 early return에 대해서 알게 되었음
> - 굳이 else 일 때를 작성하지 않고, if 실행문 안에 return 을 넣어 버리면, 값이 만족할 때까지 for문을 돌다가, 조건을 만족할 때에 return이 된다.

#### 풀이 2)

> ```js
> const twoSum = (arr, target) => {
>   for (i = 0; i < arr.length; i++) {
>     if (arr.indexOf(target - arr[i]) > -1) {
>       return [i, arr.indexOf(target - arr[i])];
>     }
>   }
> };
> ```
>
> - push를 사용하지 않고, 해당되는 값을 바로 return하는 방식
> - 이것도 결국, return이 if 실행문 안에 있었기 때문에 통과한 듯
