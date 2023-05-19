---
title: '[React] 트위터 프로젝트 1) 프로필 페이지 만들기'
date: '2022-09-25'
category: 'client'
summary: 'File Reader를 사용하여, 프로필 사진 첨부 시 미리보기 화면 만들기 구현'
---

추석 연휴동안 프론트엔드 4명, 백엔드 3명이 모여서 7일간의 단기 프로젝트로 트위터 클론 코딩을 진행하였다!

### 구현 기능

1.  로그인/회원가입 기능
2.  메인 피드 (타 유저 트윗 보기 + 내 트윗 /작성)
3.  로그인된 유저 프로필 페이지 **✅ 내가 맡은 부분**
4.  가입된 유저 검색
5.  사이드 네비게이터를 통한 페이지 이동 + 모달 메뉴

이번편은 쪼금 어려웠던, 첨부된 이미지 파일 미리보기 만들기!에 대해 써보려고 한다.

프로필 편집 버튼을 눌렀을 때에, 배경사진과 프로필 사진을 수정하였을 때에, 어떤 사진으로 수정되었는지 바로 확인할 수 있는 기능을 구현하였다.

우선 첨부된 파일을 웹 화면에서 보기 위해서는, 파일을 File Reader를 사용하여 Data url 형식으로 변환해주어야 한다.

> ### Data URI이란,
>
> Data URIs, 즉 data: 스킴이 접두어로 붙은 URL은 컨텐츠 작성자가 작은 파일을 문서 내에 인라인으로 임베드할 수 있도록 해준다.

> ### FileReader
>
> FileReader 객체는 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여 읽을 파일을 가리키는File 혹은 Blob 객체를 이용해 파일의 내용을(혹은 raw data버퍼로) 읽고 사용자의 컴퓨터에 저장하는 것을 가능하게 해줍니다.
>
> > #### FileReader.readAsDataURL()
> >
> > - readAsDataURL은 File 혹은 Blob 을 읽은 뒤 base64로 인코딩한 문자열을 FileReader 인스턴스의 result라는 속성에 담아준다.
> > - 이 메서드를 사용해 우리의 이미지를 base64로 인코딩하여 imageSrc 라는 state 안에 넣어줄 것이다.
> >
> > #### FileReader.onload
> >
> > - FileReader가 성공적으로 파일을 읽어들였을 때 트리거 되는 이벤트 핸들러
> > - 이 핸들러 내부에 우리가 원하는 이미지 프리뷰 로직을 넣어주면 된다.
> >
> > #### FileReader.readystate
> >
> > - FileReader의 현재 상태를 나타냄  
> >   ![](https://velog.velcdn.com/images/jiwonyyy/post/f97296fc-0751-422d-a2db-c7900a4e57ec/image.png)

## 구현 방식

#### 1) 프로필 사진 표시할 창 생성

```js
const [profileImage, setProfileImage] = useState(user.profile_image);
const profileImgFileInput = useRef(null);
```

```js
<img
  className='profileImageEditCamera2'
  src='images/Twitter_files/profile_icons/camera.png'
  alt='이미지 수정'
  onClick={() => {
    profileImgFileInput.current.click();
  }}
/>
```

img 태그를 사용하여, 프로필 사진이 표시될 공간을 만들어 주었다.  
그리고, useState 초기값은, user의 프로필 이미지로 설정해 두었다.

#### 2) 파일 업로더 생성

```js
<input
  className='fileUploader2'
  type='file'
  accept='image/*'
  onChange={profileChange}
  ref={profileImgFileInput}
  name='profile_img'
/>
```

- file 타입의 input 태그 생성 후, useRef를 사용하여, 이 태그를 참조하도록 설정해두었다.
- input의 기본 CSS는 매우 별로이기 때문에, opacity : 0을 설정하여, 보이지 않도록 함.

#### 3) file input에 onChange 이벤트 함수 생성

```js
const profileChange = (e) => {
  if (e.target.files[0]) {
    setProfileFiles(e.target.files[0]);
  } else {
    setProfileImage(user.profileImg);
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.readyState === 2) {
      setProfileImage(reader.result);
    }
  };
  reader.readAsDataURL(e.target.files[0]);
};
```

- input type=file은 파일을 첨부할 때마다 onChange 함수가 실행된다.
- fileReader를 생성하고 이미지를 불러와서 readAsDataURL함수를 사용하면, 이미지 창에 새로 첨부된 파일이 보여진다.

## 따란!!

![](https://velog.velcdn.com/images/jiwonyyy/post/a350d11a-0ce6-4e1d-a27f-90db8f570ce3/image.png)
