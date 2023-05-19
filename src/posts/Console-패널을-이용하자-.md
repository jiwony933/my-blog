---
title: 'Console 패널을 이용하자!'
date: '2022-08-19'
category: 'cs'
summary: '개발자도구 - Console 사용하기'
---

개발을 하면서 매우 자주 사용하게 될 개발자 도구  
그 중에서 console에 대해 공부해보았다.

> ### 1\. 개발자 도구 보는 방법
>
> Mac : \[Cmd + Opt + i\]  
> Window : \[Cmd + Opt + i\] 또는 \[F12\]  
> 마우스 우클릭 > 검사  
> ![](https://velog.velcdn.com/images/jiwonyyy/post/2401a82d-ec05-43dc-90cd-ca7ad63cc2f1/image.png)
>
> ### 2\. console 패널의 기능
>
> - 현재 페이지에서 실행중인 javascript의 console을 확인할 수 있음
> - javascript 코드를 작성하고 바로 실행시킬 수도 있음.
>
> ```js
> console.log(2 + 3); // 5라고 결과가 잘 나온다.
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/eba7b73b-9d94-4006-ace5-6fa97643ce33/image.png)
>
> ```js
> alert('hi'); // 현재 창에 "hi"라고 알림창이 뜬다.
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/0e69da7c-90e7-48a5-b9e9-b5551b18f388/image.png)
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/20a3d8d9-a8fd-475b-950d-af70c8acdd55/image.png)
>
> ### 3\. Preserve Log
>
> - 콘솔 창은 새로고침을 하면 reset되는게 default 이다.
> - 새로고침 후에도 console 기록이 남게 하려면 설정(톱니바퀴) -> Preserve Log 체크를 활성화시키면 된다.  
>   ![](https://velog.velcdn.com/images/jiwonyyy/post/ace7edba-fff6-415c-b737-b66928711152/image.png)
>
> 여기서 주의!)  
> 기록이 남았다고 해서 데이터가 유효한 것은 아님
>
> ```js
> let a = 123;
> console.log(a); // 123
> //--------새로고침--------//
> console.log(a); // a를 찾을 수 없다는 error 가 뜸
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/0538faef-1304-474a-b7a9-2a6521ef5e6b/image.png)
>
> ### 4\. 콘솔 창을 깨끗이 하고 싶을 땐 ?
>
> - 새로고침 없이 콘솔창을 리셋하고 싶을 때에는, clear 명령어를 써준다.
> - 아래 두가지 모두 가능
>
> ```js
> console.clear();
> clear();
> ```
>
> 여기서 주의!)  
> 3번에서 설명한 preserve log가 체크되어있을 때에는 두 가지 기능이 충돌하여 clear가 작동하지 않음
>
> ### 5\. warnings, errors를 제외하고 보는 방법
>
> - default levels에서 "Warinings", "Errors" 체크 해제  
>   ![](https://velog.velcdn.com/images/jiwonyyy/post/f8858b13-ebf2-41b0-b5fb-7605ce8d934e/image.png)
>
> 여기서 주의!)  
> 페이지 자체의 에러는 보이지 않지만, 직접 콘솔창에 작성한 코드의 에러는 뜸
>
> ### 6\. 다른 패널에서 console panel함께 보는 방법은?
>
> 다른 패널이 켜진 상태에서 \[esc\] 누르면 됨 (매우 간단!)
