---
title: '티처블머신 익스텐션 만들기 - 1) 시작하며, 이미지 샘플 관리하기'
date: '2024-02-10'
category: 'library-framework'
summary: 'tensorflow로 구글 티처블 머신을 직접 구현해보자!'
---

## 티처블머신이란?

https://teachablemachine.withgoogle.com/train/image

티처블머신이란 구글에서 제공하는 머신러닝을 간단하게 사용할 수 있는 프로그램이다. 사용자가 직접 이미지를 녹화하여 모델을 학습시키고, 입력되는 이미지의 신뢰도를 확인할 수 있다.

기존에 내부 스크래치에도 티처블 머신 익스텐션이 구현되어 있었다. 다만, 기존의 티처블 모델 익스텐션은 구글 티처블머신 사이트에서 모델을 학습 시키고, 구글 클라우드에 업로드 한 뒤 url을 불러와 스크래치에서 사용하는 방식이었다.

이러한 방식은 주요 사용자인 초등학생들에게는 복잡한 과정이었고 (학습을 위해 스크래치 외부로 나가야 함), 모델을 한번 학습한 뒤에는 링크를 가지고 모델을 수정할 수 없다는 문제가 있었다. 그래서 scratch-gui 에서 직접 tensorflow 패키지를 설치하고 티처블 머신 모델을 학습시킬 수 있는 기능을 구현하게 되었다.

## 티처블머신 보일러플레이트

해당 익스텐션을 구현하면서, 구글에서 제공하는 티처블머신 보일러플레이트 코드가 많은 도움이 되었다. 코드를 열어보면 코드 자체는 150줄도 안되게 매우 간결했다.
https://github.com/googlecreativelab/teachable-machine-boilerplate

우선 보일러 플레이트의 코드를 먼저 분석해보자.

```
// package.json
  "dependencies": {
    "@tensorflow-models/knn-classifier": "^0.2.2",
    "@tensorflow-models/mobilenet": "^0.2.2",
    "@tensorflow/tfjs": "^0.13.0"
  },
```

모델 학습을 위해 설치가 필요한 패키지는 3개이다.

메인 코드를 살펴보자.

```jsx
// main.js
const NUM_CLASSES = 3;
const IMAGE_SIZE = 227;
const TOPK = 10;

class Main {
  constructor() {
    this.training = -1; // -1 when no class is being trained
    this.videoPlaying = false;
    this.bindPage();
    this.video = document.createElement('video');
    document.body.appendChild(this.video);

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.video.srcObject = stream;
          // ...
      })
  }

  async bindPage() {
    // ...
  }

  start() {
    // ...
  }

  stop() {
    // ...
  }

  async animate() {
    // ...
  }

window.addEventListener('load', () => new Main());
```

보일러 플레이트의 코드를 그대로 실행시켜보면 아래와 같다. 매우 심플하다. 녹화되는 화면은 보이되 학습에 사용된 샘플을 확인할 수는 없다.

![](https://velog.velcdn.com/images/jiwonyyy/post/d53d6651-bfd4-4d11-9828-107d37f9daa9/image.png)

### 티처블 머신 기능 개발에서 필요한 추가적인 기능

- 학습된 샘플 이미지를 보여주기
  → label, samples, trainingId 등의 값을 갖는 학습되는 클래스를 classes라는 배열로 관리하기
- 카메라 뷰 보이기, 녹화할 카메라 기계 선택하기
  → TmTrainingClass에 video 객체 값 추가해주기
- 학습된 모델을 스크래치 블럭에 적용하여 스크래치 화면에서 사용하기
  → url로 모델을 불러오는 기능과 동시 동작할 수 있도록, 데이터 포맷을 맞춰 기존 scratch-vm 코드를 최대한 유지하는 방향으로 구현

_해당 포스팅은 초기 세팅 ~ 학습된 이미지 샘플을 보여주는 과정에 대해서 작성_

## 구현 과정

### TmTraining class 만들기

```jsx
class TmTraining {
  constructor(modelData) {
    this.mobilenet = null;
    this.knn = null;
    this.training = -1;
    this.video = null;
    this.videoPlaying = false;
    this.classes = [];
    this.predictionResult = null;
    this.videoDeviceId = null;

    this.bindPage();

    this.setVideo();
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoDeviceId = stream.getVideoTracks()[0].getSettings().deviceId;
        this.video.srcObject = stream;
      });

 // ... 함수 종류는 기존 보일러 플레이트 코드와 유사
  }
```

### 이미지 샘플 관리하기

- image sample을 저장 해야하는 부분은 animate가 호출되는 부분에서, 버튼을 눌러 녹화중일 떄 (this.trainingId ≠= -1 일때) 이다.
- `tf.fromPixels(this.video)` 에서는 video의 스냅샷을 tensor 객체로 저장한다.
- `tf.toPixels(image, canvas)` 에서는 fromPixels에서 tensor로 변환된 객체를 캔버스에 그린다. 두번째 인자로 canvas element를 넣어주어야 ㅎ나다.
- 그리고 toPixels로 반환된 값을 해당 ID의 examples에 push하여 이미지를 관리해 준다.

```jsx
if (this.videoPlaying) {
  const image = tf.fromPixels(this.video);
  let logits = null;
  const infer = () => this.mobilenet.infer(image, 'conv_preds');

  if (this.training !== -1) {
    logits = infer();

    const canvas = document.createElement('canvas');
    const imageData = await tf.toPixels(image, canvas);
    const classTraining = this._findClassByTrainingId(this.training);

    if (classTraining) {
      classTraining.examples.push(imageData);
      this.knn.addExample(logits, this.training);
    }
  }
  // ... rest
}
```

### 저장된 이미지 렌더링 하기

- 저장된 samples은 UintClampedArray 형태이다. 이를 다시 컴포넌트에 그려주기 위해서는 아래와 같은 변환 과정이 필요하다.

```jsx
    getImageUrl (example){
        const {width: imageWidth, height: imageHeight} = this.props.tmTrainingInstance.getVideoSize();
        const canvas = document.createElement('canvas');
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        const context = canvas.getContext('2d');
        context.putImageData(new ImageData(example, imageWidth, imageHeight), 0, 0);
        return canvas.toDataURL();
    }
```

### 이미지가 많아질수록 이미지 렌더링이 느려지는 현상을 해결한 과정

처음에는 이미지를 그려줄 때, props로 받은 UintClampedArray를 컴포넌트에서 계속 변환해서 사용하였다. 하지만 이렇게 관리를 하다보니 클래스가 업데이트 될 때마다 큰 용량의 array를 변환하는 함수를 계속 호출하여 이미지 렌더링이 느려졌다. 변환된 이미지 url을 state로 관리하여 불필요한 getImageUrl 함수 호출을 최소화 하는 방식으로 수정하였다.

```jsx
// before
{
  this.props.examples.map((example, index) => (
    <ImageSample
      key={index}
      src={getImageUrl(example)}
      onDelete={() => this.deleteSample(index)}
    />
  ));
}

// after
{
  this.state.exampleUrls.map((example, index) => (
    <ImageSample
      key={index}
      src={example}
      onDelete={() => this.deleteSample(index)}
    />
  ));
}
```

## 결과물

![](https://velog.velcdn.com/images/jiwonyyy/post/c3fc9859-a7f8-49e6-892c-1df7a6d8108a/image.png)
