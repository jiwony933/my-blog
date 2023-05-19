---
title: '[Javascript] 배열의 모든 값을 합치는 방법 (forEach/reduce/for문)'
date: '2022-07-23'
category: ''
summary: '배열 내의 요소들의 총 합계를 구하는 방법 여러개 정리해보기 (forEach/reduce/for문)'
---

배열 내의 요소들의 총 합계를 구하는 방법 여러개 정리해보기

> ### 1\. forEach 사용하기
>
> 배열의 요소에 각각 접근하여 0에 더해주기
>
> ```js
> let array = [1, 2, 3, 4, 5];
> function sumByForEach(array) {
>   let sum = 0;
>   array.forEach((item) => (sum += item));
>   return sum;
> }
> console.log(sumByForEach(array)); // 15
> ```

####

> ### 2\. reduce 사용하기
>
> array.reduce((누적 계산 값, 현재 값)=>{return 계산 값}, 시작 값)
>
> ```js
> let array = [1, 2, 3, 4, 5];
> function sumByReduce(array) {
>   return array.reduce((prev, cur) => prev + cur, 0);
> }
> console.log(sumByReduce(array)); // 15
> ```
>
> 시작 값 0,  
> 누적 계산 값 0 + 현재 값 1 = return 계산 값 1  
> 누적 계산 값 1 + 현재 값 2 = return 계산 값 3  
> 누적 계산 값 3 + 현재 값 3 = return 계산 값 6  
> 누적 계산 값 6 + 현재 값 4 = return 계산 값 10  
> 누적 계산 값 10 + 현재 값 5 = return 계산 값 15

####

> ### 3\. for문 사용하기
>
> ```js
> function sumByFor(array) {
>   let sum = 0;
>   for (i = 0; i < array.length; i++) {
>     sum += array[i];
>   }
>   return sum;
> }
> console.log(sumByFor(array)); //15
> ```
>
> for문을 사용해서 0에다, 인덱스 차례대로 값을 더해주기
