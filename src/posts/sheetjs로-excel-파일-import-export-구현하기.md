---
title: 'sheetjs로 excel 파일 import/export 구현하기'
date: '2023-04-15'
category: 'client'
summary: '오늘은 어드민에서 대량의 데이터를 업로드하거나, 가공할때 엑셀로 업로드/다운로드가 가능하게 만드려고 한다! 엑셀 import/export 기능 구현을 위해 sheetjs(=XLSX) 라이브러리를 사용하였다.'
---

다시 돌아온 블로깅 day..!

오늘은 어드민에서 대량의 데이터를 업로드하거나, 가공할때 엑셀로 업로드/다운로드가 가능하게 만드려고 한다!

엑셀 import/export 기능 구현을 위해 sheetjs(=XLSX) 라이브러리를 사용하였다.

![](https://velog.velcdn.com/images/jiwonyyy/post/05a68fe4-767e-4f6d-b572-a1c7aa8bb9f0/image.png)

weekly download가 무려 200만에 가까운..! 믿고 가보자고~!

# 엑셀 파일 업로드

### sheet to json

먼저, 엑셀 파일을 업로드 해서 json화 시키는 방법을 알아보자

![](https://velog.velcdn.com/images/jiwonyyy/post/a9d655ac-c16b-4999-8491-b9c59404439d/image.gif)

1.  라이브러리 import 해오기

```js
import * as XLSX from 'xlsx';
```

2.  import된 excel을 읽는 함수 만들기

> 1.fileReader 객체 생성하고, readAsArrayBuffer()로 선택한 파일을 ArrayBuffer 형태로 읽는다.
>
> ```js
> fileReader.readAsArrayBuffer(file);
> ```
>
> 2.  onload 이벤트가 발생하면, arrayBuffer 데이터를 `XLSX` 라이브러리의 `.read()`함수에 전달하여 파일을 파싱한다.
>
> ```js
> fileReader.onload = (e: ProgressEvent<FileReader>) => {
>     if (!e.target) return;
>     const bufferArray = e.target.result;
>     const fileInformation = XLSX.read(bufferArray, {
>       type: 'buffer',
>       cellText: false,
>       cellDates: true,
>     });
> ```
>
> - read 메서드를 쓸때에, 두번째 파라미터로 다양한 옵션들을 넣을 수 있는데  
>   [https://docs.sheetjs.com/docs/api/parse-options/](https://docs.sheetjs.com/docs/api/parse-options/) 공식문서 참고!
>
> 3.  반환된 객체에서 sheetNames는 sheet 이름들의 배열이고 원하는 sheet를 선택하여 최종 데이터를 `sheet_to_json`을 사용하여 JSON 형태로 반환하면 끝
>
> ```js
> const sheetName = fileInformation.SheetNames[0];
> const rawData = fileInformation.Sheets[sheetName];
> const data = XLSX.utils.sheet_to_json(rawData);
> ```

전체 readExcel 코드

```js

 const readExcel = async (file: File) => {
   const fileReader = new FileReader();
   fileReader.readAsArrayBuffer(file);
   fileReader.onload = (e: ProgressEvent<FileReader>) => {
     if (!e.target) return;
     const bufferArray = e.target.result;
     const fileInformation = XLSX.read(bufferArray, {
       type: 'buffer',
       cellText: false,
       cellDates: true,
     });
     const sheetName = fileInformation.SheetNames[0];
     const rawData = fileInformation.Sheets[sheetName];
     const data = XLSX.utils.sheet_to_json(rawData);

     data && setUploadedFileData(mappingDataToTable(data as any[]));
    };
  };
```

3.  readExcel 갖다쓰기

```js
const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const file = e.target.files[0];
  readExcel(file);
};
```

# 엑셀 파일 다운로드

엑셀 파일을 다운받는거는 좀 더 간단하다!

여기서 좀더 이해하기 쉬우려면 workbook과 worksheet에 대해서 알면 되는데,

> workbook === 엑셀 파일 전체  
> worksheet === 엑셀 파일의 시트

데이터를 `json_to_sheet`를 사용하여 시트로 변환하고, workbook에 append 해주면 된다.

### json to sheet

```js
export const excelDownload = (data: object[], fileName: string) => {
  const excelFileName = `${fileName}_${formatFileNameDate(new Date())}.xlsx`;

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, excelFileName);
};
```

이 코드를 실행시켰을 때 어떻게 나오냐~ 하면

```js
const exampleData = [
  {
    주문번호: 1,
    주문인: '지원',
    주문상품: '물병1',
    결제금액: 2000,
  },
  {
    주문번호: 2,
    주문인: '조이',
    주문상품: '컵1',
    결제금액: 3000,
  },
];

const handleExcelDownload = () => {
  excelDownload(exampleData, 'test');
};
```

![](https://velog.velcdn.com/images/jiwonyyy/post/8ef93531-d8f3-49bc-bc9b-ee1b6fc34e15/image.png)

나는 블로그 쓰는게 너무 좋다 ! 나는 행복하다 !
