---
title: 'Math.random()은 진짜 랜덤일까?'
date: '2024-02-21'
category: 'cs'
summary: 'Math.random()이 생성하는 랜덤한 수는 어떻게 만드는 걸까? 컴퓨터가 정말 랜덤한 수를 만들 수 있는 걸까?'
pinned: true
---

왜 이런 의문을 갖게 되었냐 하면.. 프로젝트 패키지를 설치하던 도중 여러 warning message 중에 내 눈을 사로 잡는 게 있었다.

```
npm WARN deprecated uuid@3.4.0: Please upgrade to version 7 or higher.
Older versions may use Math.random() in certain circumstances, which is known to be problematic.
See <https://v8.dev/blog/math-random> for details.
```

`Math.random()`은 0 이상 1 미만의 부동 소수점 난수를 생성하는 함수이다.

7 버전 이하의 uuid는 `Math.random()`을 사용하고 있고, 이는 문제가 생길 수 있다는 내용이었다.

Math.random()이 사용된 부분을 뒤져보니, uuid/lib/rng-browser.js 였다. crypto 가 없는 환경에서는 Math.random() 을 사용하는 내용이다.

```jsx
var getRandomValues =
  (typeof crypto != 'undefined' &&
    crypto.getRandomValues &&
    crypto.getRandomValues.bind(crypto)) ||
  (typeof msCrypto != 'undefined' &&
    typeof window.msCrypto.getRandomValues == 'function' &&
    msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  var rnds8 = new Uint8Array(16);

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
    }

    return rnds;
  };
}
```

난수를 직접 생성할 때에는 `Math.random()`을 사용하고 있었던 것 같은데 왜 위험한지? 에 대해서 궁금해졌고, `Math.random()`이 난수를 생성하는 방식에 대해서 알아보게 되었다.

## 랜덤하다는 것은 뭘까?

- 주사위를 던졌을 때 뭐가 나올까? 우리는 주사위를 던졌을 때 나오는 수를 랜덤하다 라고 이야기 할 수 있다. 하지만, 주사위의 크기, 모양, 재질, 던질 때의 방향, 던지는 방향, 던지는 힘의 크기, 그 당시의 바람 세기 (?) 등 모든 조건을 똑같이 한다면, 항상 같은 결과가 나올 것이다.
  하지만 이 모든 조건을 맞추는 것은 사실상 불가능하기 때문에 우리는 주사위를 던져서 나오는 결과를 랜덤하다 라고 할 수 있다.

## Math.random()은 진짜 무작위일까?

Math.random()은 실제로 난수를 생성하는 것이 아니라, 의사 난수(pseudo-random number)라는 것을 생성한다고 한다.

### 의사난수란?

의사 난수(pseudo-random number)는 컴퓨터 프로그램이 수학적인 알고리즘을 사용하여 생성한 난수다. 진정한 무작위성이 아닌, 시작값인 시드(seed)와 알고리즘에 의해 계산된 일련의 값이다.

실제로 컴퓨터는 무작위한 숫자를 생성하는 데 한계가 있으며, 물리적인 엔트로피 소스를 사용하여 완전한 무작위성을 달성하는 것은 어렵다. (예를 들어서 주사위를 던지는 행위 등)
대신, 의사 난수 생성기는 초기값인 시드(seed)를 사용하여 무작위처럼 보이는 수열을 생성한다. 같은 시드로 시작하면 항상 같은 수열을 생성하며, 다른 시드를 사용하면 다른 수열을 생성한다.

시드 기반 난수로 암호화 키를 생성하는 경우 키 값의 일부를 알고 있다면 나머지 키 값도 유추하는게 가능해질 수 있다. 패턴을 통해서 쉽게 추측할 수 없거나, 시간이 지나도 반복되지 않는 진짜 난수가 필요하다는 것이다.

### PRNG 난수 생성 알고리즘

그리고 이러한 난수 생성 알고리즘을 PRNG(pseudo-random number generator) 라고도 한다.

PRNG은 진짜 무작위한 값을 생성할 수 없고, 특정 공식을 사용해 무작위로 보일 수 있지만, 결국 난수를 계속해서 생성하면 반복되어 어떠한 패턴을 나타내게 된다.

난수 생성 알고리즘은 이 패턴이 나오기까지의 기간 즉, 몇 번의 반복 끝에 패턴을 유추할 수 있는지에 따라 품질이 달라지며, 이 수가 크면 클 수록 크래킹하기 어려워 지고, 더 랜덤인 함수인 척을 잘 할 수 있다.

그렇다면 JavaScript가 사용하는 PRNG는 무엇일까? -> 자바스크립트가 결정하는 것은 아니고 브라우저에 따라 다르지만, 현재 주요 브라우저는 xorshift128+ 라는 알고리즘을 사용하고 있다고 한다. 하지만 각 브라우저별로 해당 알고리즘을 어떻게 사용하고 있는지는 알 수 없다.

![](https://velog.velcdn.com/images/jiwonyyy/post/8575b5df-8c36-4415-a784-8c45de29a1a8/image.png)

Math.random()은 다른 언어와 달리 내부 시드값을 정할 순 없지만, 내부 시드값과 Math.random 함수에서 사용하는 알고리즘이 어떻게 사용되는지 밝혀진다면 치명적일 것이다.

### 어떤 시드를 사용한다면 랜덤에 가까워질 수 있을까?

1. 시스템 시간
   1. 일부 브라우저는 현재 시스템 시간을 기반으로 시드를 생성합니다. 이 방법은 일반적으로 다양한 시드 값을 생성할 수 있으며, 다른 시간에 호출하면 다른 결과를 얻을 수 있다.
2. 무작위 이벤트
   1. 브라우저가 무작위 이벤트를 사용하여 시드를 생성하는 경우도 있다.
   2. 마우스 움직임, 키보드 입력, 네트워크 패킷 도착 등의 이벤트를 활용하는 경우
3. 시스템 엔트로피
   1. 보안 목적으로 브라우저에서는 물리적 엔트로피 소스(예: 하드웨어 장치의 잡음)를 사용하여 보다 안전한 시드를 생성하기도 한다.

## 그렇다면? 뭘써야해?

보안 목적으로 필요한 모든 임의의 값 (공격자에게 공격 받을 수 있는 가능성이 있는 모든 값)는 암호학적으로 안전한 의사 난수 생성기 (Cryptographically Secure Pseudo-Random Number Generator, CSPRNG)를 사용하여 생성해야 한다.

Cryptographically Secure = 암호학적으로 안전한

- **Note:** `Math.random()` *does not* provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the `[window.crypto.getRandomValues()](<https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues>)` method.
  ![](https://velog.velcdn.com/images/jiwonyyy/post/f2ac23ac-8b0c-4a23-89db-9aebd0c6343a/image.png)

### Web Crypto API

- CSPRNG를 사용한다.
- CSPRNG는 시드 자체가 예측하기 어렵게 설계되어 있으며, 생성된 난수 시퀀스를 바탕으로 시드를 역추적하기 매우 어렵다.
  1. **안전한 시드 생성**:
     - CSPRNG의 핵심 요소 중 하나는 안전한 '시드' 생성이다. 이 시드는 일반적으로 시스템의 엔트로피 소스(예: 마우스 움직임, 키보드 입력, 시스템 클록(컴퓨터 시스템 내에서 시간을 추적하고 관리하는 장치) 등)에서 한다. 이러한 엔트로피 소스는 예측하기 어려워 난수 시퀀스를 예측할 수 없게 만든다.
  2. **고도의 예측 불가능성**:
     - CSPRNG에서 생성된 난수는 고도로 예측 불가능해야 한다. 즉, 생성된 난수 중 일부를 알고 있어도 다음 난수를 예측하기 매우 어렵다.
  3. **균일한 분포**:
     - 생성된 난수는 균일하게 분포되어 있어야 한다. 즉, 모든 가능한 값이 발생할 확률이 거의 같아야 한다.
  4. **플랫폼 및 구현에 따른 차이**:
     - Web Crypto API의 구체적인 구현은 브라우저나 플랫폼에 따라 다를 수 있다. 그러나 모든 구현은 암호학적으로 안전한 난수 생성을 보장해야 한다.
       ```jsx
       var array = new Uint32Array(1);
       window.crypto.getRandomValues(array);
       console.log('Random number: ' + array[0]);
       ```

!https://velog.velcdn.com/images/jiwonyyy/post/2bcdaf60-6066-4ee4-af72-14937d453fa5/image.png

### 라바램프?

![](https://velog.velcdn.com/images/jiwonyyy/post/565213fb-5865-4846-a5ab-a34bae1c24ba/image.png)

병 안에 색소가 들은 반투명한 액체와 왁스가 담겨 있으며 전구를 켜면 전구의 열을 받은 왁스가 녹아 병의 위쪽으로 상승했다가 냉각되어 다시 내려오고를 반복한다. 이것이 마치 용암의 움직임과 비슷하기 때문에 라바 램프라는 이름이 붙었다.

CloudFlare는 100개의 라바 램프를 회사 사무실 입구에 전시했는데 라바 램프의 움직임, 지나가는 사람의 모습, 일광 변화와 같은 다양한 요인에 따라 변경되는 픽셀 디스플레이를 고속카메라로 촬영해서 임의의 숫자 난수를 만들어서 쓴다고 한다.
