---
title: '[React] 트위터 프로젝트 2) FormData를 사용하여, 서버에 이미지 파일 전송하기'
date: '2022-09-25'
category: ''
summary: 'Form Data 를 사용하여, 이미지파일, 텍스트 동시에 서버에 보내기!'
---

처음에는 Data url을 사용하여 보냈더니 백엔드에서 받을 수 없는 형태라고 하여, 방법을 알아보다가 Form Data라는 것을 알게되었다...!  
Form Data는 이미지, 텍스트 등 다양한 형태의 data를 한번에 보낼 수 있는 데이터 형태로 이해하였다.

공식 문서에 따르면

> FormData 인터페이스는 form 필드와 그 값을 나타내는 일련의 key/value 쌍을 쉽게 생성할 수 있는 방법을 제공합니다.  
> 또한 XMLHttpRequest.send() (en-US) 메서드를 사용하여 쉽게 전송할 수 있습니다.  
> 인코딩 타입이 `"multipart/form-data"`로 설정된 경우, form에서 사용하는 것과 동일한 포맷을 사용해야 합니다.

### Form Data에 대해 알게 된 것들

> #### 1) Form data는 FormData() 생성자를 통해 생성할 수 있다.
>
> ```js
> const formData = new FormData();
> ```
>
> 위의 코드를 통해, 빈 폼데이터를 생성할 수 있다.

> #### 2) 빈 폼데이터에 key와 value를 append함으로써, 데이터를 추가할 수 있다.
>
> ```js
> formData.append('username', 'jiwon');
> ```

> ### 내가 트위터 프로젝트에서 사용한 방법
>
> #### 3) 폼데이터는 빈 폼데이터에 데이터를 추가하는 방법 외에 form 태그를 DOM으로 불러와서, 지정된 양식 대로 value를 채울 수도 있다.
>
> ```js
> const editForm = document.getElementById('profileEditForm');
> // form 태그에 id를 부여하고, DOM으로 불러오기
>
> // 함수 작성 부분 (저장하기 버튼에 onClick함수로 사용)
> const profileEditSave = () => {
>     fetch('http://서버 주소/profile/edit', {
>       method: 'PATCH',
>       headers: {
>         'Content-Type': 'application/json;charset=utf-8',
>         enctype: 'multipart/form-data',
>      // 서버와 통신할 떄 multipart/form-data로 타입을 설정해주어야 한다.
>         authorization: 'accessToken',
>       },
>       body: editForm,  // DOM으로 불러온 Form Data를 body에 실어서 보내주기
>       }),
>     }).then(response => console.log(response));
>   };
>
> // 보여질 내용
>    <form className="ProfileEdit" id="profileEditForm">
>           <input
>             className="fileUploader"
>             type="file"
>             accept="image/*"
>             name="backgroundImg"  // 백엔드에서 받을 name과 일치해야함
>           />
>  		<div className="profile-edit">
>           <div className="profile-edit-input-wrap">
>             <span>이름</span>
>             <input
>               name="profile_nickname"  // 백엔드에서 받을 name과 일치해야함
>             />
>           </div>
>           <div className="profile-edit-input-wrap">
>             <span>자기소개</span>
>             <textarea
>               name="comment"  // 백엔드에서 받을 name과 일치해야함
>             />
>           </div>
>       </form>
> ```
