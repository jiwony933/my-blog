---
 title: 'QR코드 스캐너 만들기(qr-scanner)'
 date: '2023-09-15'
 category: 'client'
 summary: '웹에서 QR을 읽는 스캐너를 만들어 보자'
---

지난주에 이어, 이번주에는 QR 스캐너를 만들어 보자!

원하는 기능은 QR을 리딩하면, QR에 담겨있는 JSON 객체를 파싱하여 user의 runs 테이블에 기록하는 것이다.

QR 스캔에 사용된 라이브러리는 'qr-scanner'이다.
해당 라이브러리를 사용하면 아주 간편하게 QR코드 스캐너를 만들 수 있다.

## QR코드 스캐닝

### 1. 라이브러리 설치하기

- qr-scanner 라이브러리를 설치해준다.

```
npm install qr-scanner
```

혹은

```
yarn add qr-scanner
```

https://www.npmjs.com/package/qr-scanner

### 2. QR스캐너 불러오기

```js
import QrScanner from 'qr-scanner';
```

### 3. 카메라 뷰가 보일 video 태그 추가하기

```js
<CameraView ref={videoRef} />;

export const CameraView = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
```

### 4. 비디오 요소 초기화 및 QR 스캐너 시작

```js
useEffect(() => {
  const videoElem = videoRef.current;
  if (videoElem) {
    const qrScanner = new QrScanner(
      videoElem,
      (result) => handleScan(result),
      QrOptions
    );
    qrScanner.start();

    return () => qrScanner.destroy();
  }
}, []);
```

여기서 QrOptions에는 다양한 옵션을 넣을 수 있는데, 나는 필요한 3가지를 설정했다.

```js
export const QrOptions = {
  // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
  preferredCamera: 'environment',
  // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 5번 QR 코드 감지한다.
  maxScansPerSecond: 5,
  // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
  highlightScanRegion: true,
};
```

### 5. QR 코드 스캔 결과를 처리하는 함수 만들기

- QR 코드 스캔 결과를 처리하는 함수를 만들어 준다.
  (해당 함수는 위의 useEffect 함수 안에서 new QrScanner()를 생성할 때 두번째 인자로 사용된다.)

- 나는 result의 data를 받아서, 파싱한 후에 state를 업데이트 시켜주도록 하였다.

```js
const handleScan = (result: QrScanner.ScanResult) => {
  const parsedData = JSON.parse(result.data);
  setMyRun({
    location_id: parsedData.location_id,
    ranking: parsedData.ranking,
  });
};
```

그리하여 완성된 QR코드 스캐닝 하는 화면

![](https://velog.velcdn.com/images/jiwonyyy/post/e321eb81-c273-46bc-97b9-b249b05694e1/image.png)

원하는 정보를 담는 QR코드 만드는 방법은
https://jiwonyyy.site/posts/QR코드-만들기
해당 포스팅 참고!

### 전체 코드

```js
import { FlexColumnBox } from '@/styles/common';
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { CameraView, CameraViewWrapper, ScannedData } from './styles';
import { QrOptions } from './constants';
import { useTodayEvent } from '@/api/event/useTodayEvent';
import ConfirmRecord from './ConfirmRecord';

interface P {}

const ReadCode = ({}: P) => {
  const { data: todayEvent } = useTodayEvent();
  const [myRun, setMyRun] = useState({
    location_id: null,
    ranking: null,
  });

  const videoRef = useRef(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    const parsedData = JSON.parse(result.data);
    setMyRun({
      location_id: parsedData.location_id,
      ranking: parsedData.ranking,
    });
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        QrOptions
      );
      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <FlexColumnBox>
      <CameraViewWrapper>
        <CameraView ref={videoRef} />
      </CameraViewWrapper>
      {myRun.location_id !== null && myRun.ranking !== null && (
        <ConfirmRecord todayEvent={todayEvent} myRun={myRun} />
      )}
    </FlexColumnBox>
  );
};

export default ReadCode;
```
