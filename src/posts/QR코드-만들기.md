---
 title: 'QR코드 만들기(qrcode.react)'
 date: '2023-09-08'
 category: 'client'
 summary: '내가 원하는 정보를 담은 QR 코드 만들기'
---

현재 진행중인 프로젝트에서 QR코드를 스캔해서 데이터를 읽고, 업로드 해야하는 기능이 필요했다.

우선, QR 코드(Quick Response 코드)는 다양한 종류의 정보를 담을 수 있는 이차원 바코드 형식이다.

텍스트, 숫자, 링크, 연락처 정보, 지리적 좌표 등 다양한 유형의 데이터를 담을 수 있다.

내가 QR코드에 담고자 하는 데이터는 아래와 같은 객체를 JSON문자열로 변형한 string이다.

```js
{
	"locationId" : 1,
    "recordId" : 1
}
```

## QR코드 만들기

우선 원하는 정보를 QR코드에 담아보자.
`qrcode.react`라는 라이브러리를 사용하였다.

### 1. 라이브러리 설치하기

```
npm install qrcode.react
```

혹은

```
yarn add qrcode.react
```

### 2. QR코드 띄우기

- 라이브러리 설치 후 큐알 코드를 화면에 띄우는 것은 쉽다.
- `<QRCode />` element에 원하는 value값만 넘겨주면 된다.

```js
import QRCode from 'qrcode.react';

const CreateCode = ({}: P) => {
  return (
    <Container>
      <QRCode value={QR에 담고 싶은 정보} />
    </Container>
  );
};

export default CreateCode;
```

### 3. 원하는 QR코드 만들기

- 나는 locationId와 recordId를 담은 객체 정보를 담고 싶었기 때문에 좀 더 코드를 작성해보았다.

```js
interface Data {
  locationId: number | null;
  recordId: number | null;
}

const CreateCode = ({}: P) => {
  const [data, setData] =
    useState <
    Data >
    {
      locationId: null,
      recordId: null,
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <Container>
      <QRCode value={JSON.stringify(data)} />
      기록 ID
      <input
        name='locationId'
        value={data.locationId || ''}
        type='number'
        onChange={handleInputChange}
      />
      위치 ID
      <input
        name='recordId'
        value={data.recordId || ''}
        type='number'
        onChange={handleInputChange}
      />
    </Container>
  );
};

export default CreateCode;
```

![](https://velog.velcdn.com/images/jiwonyyy/post/1ebaeab5-501a-4eac-a901-000c3278d94e/image.png)

### 4. QR코드 다운로드 받기

- QR코드를 만들었으면 다운을 받을 수 있어야 할 것이다!
- `<QRCode />` 엘리먼트는 Canvas 속성을 가지고 있다.

- 데이터 유효성 검사를 하고, 버튼을 누르면 png 파일로 다운받을 수 있는 함수를 작성한다.

```js
const validateData = (data: Data) => {
  if (!data.locationId) return false;
  if (!data.recordId) return false;
  if (data.locationId <= 0) return false;
  if (data.recordId <= 0) return false;
};

const handleDownloadClick = () => {
  if (!validateData(data)) alert('올바르게 데이터를 입력해주세요');

  const canvas = document.querySelector('canvas');
  const url = canvas ? canvas.toDataURL('image/png') : '';
  const link = document.createElement('a');
  link.href = url;
  link.download = `qr-${data.locationId}-${data.recordId}.png`;
  // 저장되는 파일 이름이다.
  link.click();
};
```

### 전체코드

```js
'use client';

import { FlexColumnBox } from '@/styles/common';
import QRCode from 'qrcode.react';
import { useState } from 'react';

interface P {}

interface Data {
  locationId: number | null;
  recordId: number | null;
}

const CreateCode = ({}: P) => {
  const [data, setData] =
    useState <
    Data >
    {
      locationId: null,
      recordId: null,
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const validateData = (data: Data) => {
    if (!data.locationId) return false;
    if (!data.recordId) return false;
    if (data.locationId <= 0) return false;
    if (data.recordId <= 0) return false;
  };

  const handleDownloadClick = () => {
    if (!validateData(data)) alert('올바르게 데이터를 입력해주세요');

    const canvas = document.querySelector('canvas');
    const url = canvas ? canvas.toDataURL('image/png') : '';
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-${data.locationId}-${data.recordId}.png`;
    link.click();
  };

  return (
    <Container>
      <QRCode value={JSON.stringify(data)} />
      기록 ID
      <input
        name='locationId'
        value={data.locationId || ''}
        type='number'
        onChange={handleInputChange}
      />
      위치 ID
      <input
        name='recordId'
        value={data.recordId || ''}
        type='number'
        onChange={handleInputChange}
      />
      <button onClick={handleDownloadClick}>QR 다운로드</button>
    </Container>
  );
};

export default CreateCode;
```

QR코드 스캐닝은 2편으로 . . .
