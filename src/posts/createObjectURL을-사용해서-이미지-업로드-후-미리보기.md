---
title: 'createObjectURL을 사용해서 이미지 업로드 후 미리보기'
date: '2022-12-22'
category: ''
summary: '대부분의 서비스에서는 이미지 업로드 시, 내가 올린 사진이 어떤 사진인지 미리 확인할 수 있는 "미리보기" 단계를 거친 후에 이미지를 업로드 하는 기능을 제공하고 있다.'
---

![](https://velog.velcdn.com/images/jiwonyyy/post/79ff1343-9be9-4269-8a73-730fd6ad2a7f/image.gif)

### intro..

사진을 올릴 때, input type=files로 하면 파일을 업로드 할 수 있다.  
하지만 이렇게 단순한 input tag는 내가 선택한 파일 명만 확인 할 수 있다.

대부분의 서비스에서는 내가 올린 사진이 어떤 사진인지 미리 확인할 수 있는 "미리보기" 단계를 거친 후, 최종 저장을 눌러서 파일을 업로드 하는 단계를 거친다.

그렇기 때문에 이번에는 "이미지 미리보기" 기능을 구현해보고자 한다.

### 구현 단계

우선 중요한 것은  
내가 미리 보기할 이미지의 src와 file은 각각 다른 형태여야 한다는 것이다.

image src = 단순히 이미지를 사용자한테 잠깐 보여주기만 하면 됨  
file = 진짜 파일 형태로, 서버에 보낼 수 있어야 함

그래서 다음과 같은 단계로 구현을 하였다.

1.  `useState`를 사용하여 image url state와 file state를 만든다.
2.  input이 change될 때와, input이 submit 될 때의 함수를 구현한다.

- change 될 때 : imageUrl 상태 업데이트, file 상태 업데이트
- submit 될 때 : file을 서버에 전송 후, 성공 시 query를 invalidate 하여 이미지 업데이트 된 페이지 새로 렌더링

3.  input, label, image 태그를 예쁘게 꾸며준다.

### 1\. url state와 file state 구현

```js
const [mainImageUrl, setMainImageUrl] = useState(pv.image);
const [mainImageFile, setMainImageFile] = (useState < File) | (null > null);
```

- mainImageUrl은 string type이 될 것이고, mainImageFile은 file type이 될 것이다.
- File type은 console.log에 찍어 보았을 때에 아래와 같은 형태로 나오는 것이 file..  
  ![](https://velog.velcdn.com/images/jiwonyyy/post/fd28ed87-2634-42c3-ab63-91f2709a1a4c/image.png)

### 2\. createObjectUrl을 통한 함수 구현하기

사실 이 단계가 이미지 미리보기의 핵심 단계이다..  
파일 형태를 어떻게 서버에 보내지 않고 바로 브라우저에서 이미지를 보여주지?

image file을 업로드 했을 때 브라우저에서 바로 보여주는 방식에는 크게 두 가지가 있다.  
그것은 바로 fileReader와 URL.createObjectUrl()을 이용하는 것이다.  
두가지 방식을 다 사용해보았는데, 이번 기능 구현에서는 2번째 방법을 사용하였다.

#### 1) FileReader를 사용하는 방법 : 이미지를 DataURI로 변경

> ### data url 형태는?
>
> (첨부된 이미지 처럼 아주 수많은 알파벳 구성으로 변환 됨)  
> 이미지 등의 외부 바이너리 파일을 웹페이지에 인라인으로 넣기 위해 사용.  
> 컴퓨터 파일로 컴퓨터 저장과 처리 목적을 위해 이진 형식으로 인코딩된 데이터파일 (ex 이미지를 메모장으로 열었을때)  
> ![](https://velog.velcdn.com/images/jiwonyyy/post/a27645ea-55cd-436b-bcb4-c572302f812a/image.png)

#### 2) createObjectUrl을 사용하는 방법 : 이미지를 blob형태로 변경

> ### blob형태란?
>
> Blob은 javascript에서 이미지, 사운드, 비디오 같은 멀티 데이터를 다룰 때 사용한다.
>
> ### URL.createObjectUrl()
>
> URL.createObjectURL() 메소드는 주어진 객체를 가리키는 URL을 DOMString으로 변환하는 기능을 한다. 해당 url은 window 창이 사라지면 함께 사라지고, 다른 windowd에서 재 사용이 불가능 하고 이 URL은 수명이 한정되다.
>
> #### \==== 이 말은 잠깐 미리보기에 적합하다!!!

#### 2-1. <이미지 변경> 버튼 클릭 시

이미지 input이 onChange되었을 때에 url state update, file state update가 되어야 한다.

```js
const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const file = e.target.files[0];
  if (file) {
    let image = window.URL.createObjectURL(file);
    setMainImage(image);
    setMainImageFile(file);
  }
};
```

#### 2-2. <이미지 저장> 버튼 클릭 시

imageUrl은 이제 필요가 없고, file이 업데이트 되었을때에만 file만 서버에 보내주면 됨.

```js
const handleMainImageSubmit = () => {
  if (!mainImageFile) return alert('이미지가 선택되지 않았습니다');
  editPvImage({ id: pv.id, imageFile: mainImageFile });
};
```

### 3\. input, label, button, image custom하기

내가 구현한 화면에서는 이미지 변경 버튼과, 이미지 저장 버튼이 있는 것 처럼 보이지만  
사실 이미지 변경 버튼은 버튼이 아니라 input의 label이다!

중요한 것은 input은 display none을 줘서 안보이게 하고,  
label htmlFor="input의 id와 같은 값"을 준 label을 버튼과 같이 css를 주면 된다.

```js
      <ImageInputBox>
        <label htmlFor='mainImage'>이미지 변경</label>
        <input
          id='mainImage'
          type='file'
          accept='image/*'
          onChange={handleMainImageChange}
          disabled={!isEditMode}
        />
      </ImageInputBox>
      <SaveImageButton onClick={handleMainImageSubmit}>
        이미지 저장
      </SaveImageButton>

      <ImageWrapper>
        <Image
          src={mainImage ? mainImage : '/image-assets/no-image.png'}
          layout='fill'
          alt={'이미지가 없습니다.'}
        />
      </ImageWrapper>
```

**_그리하여 완성...!!_**

![](https://velog.velcdn.com/images/jiwonyyy/post/79ff1343-9be9-4269-8a73-730fd6ad2a7f/image.gif)
