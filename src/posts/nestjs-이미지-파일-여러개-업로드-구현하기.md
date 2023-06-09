---
title: 'nestjs 이미지 파일 여러개 업로드 구현하기'
date: '2023-03-18'
category: 'server'
summary: '클라이언트에서 form-data로 보낸 이미지 파일들을 nestJs 서버에서 받는 방법을 알아보자.'
---

클라이언트에서 form-data로 보낸 이미지 파일을 서버에서 받는 방법을 알아보자.

## 클라이언트 부분

우선 클라이언트에서 서버로 파일을 보낼 때에는 Form-data에 담아서 보내주어야 한다.

> #### Form-data란?
>
> key-value쌍을 저장할 수 있는 객체이다.
>
> ```js
> const formData = new FormData();
> formData.append('key', file);
> ```
>
> 위와 같이 폼데이터를 먼저 생성하고, append method를 사용하여 value를 추가할 수 있다.

```js
const handleSubmitAdditionalImages = () => {
  for (const file of newImageFiles) {
    imagesFormData.append('image', file);
  }
  uploadPvSubImages({
    id: pvId,
    images: imagesFormData,
  });
};
```

`저장` 버튼을 누르면, state에 담겨있던 파일들을 form-data에 담아서 uploadPvImages를 실행시킨다.

axios-post 요청 코드는 아래와 같다.

```js
export interface useUploadPvSubImagesReqParams {
  id: number;
  images: FormData;
}

const uploadPvSubImages = async (params: useUploadPvSubImagesReqParams) => {
  const { data } =
    (await api.post) <
    ProductVariation >
    (`api/admin/pvs/${params.id}/sub-images`,
    params.images,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return data;
};
```

- form-data 자체가 객체형태이기 때문에, axios 두번째 인자로 그냥 폼데이터 자체만 넣어주어도 되며,
- `'Content-Type': 'multipart/form-data'`로 헤더를 지정해주어야 한다.

## 서버 부분

그렇다면 formdata를 받아서 서버에서는 어떻게 처리할까?

몇 가지 신기했던 포인트는

- multer 사용하기
- FileInterCeptor
- file이 하나인지, 여러개인지에 따라 살짝 다르다

#### Multer란?

- multer는 node.js용 미들웨어로, 클라이언트에서 보내는 form-data를 다룰 때 사용할 수 있다.
- multer를 nestjs에서 사용하기 위해서는 `MulterModule`을 multer를 사용할 모듈에 등록해주어야 한다.

```js
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      // ConfigService를 주입 받아서, S3 스토리지를 사용
      useFactory: multerOptionsFactoryOf('product-variation'),
    }),
    HttpModule,
  ],
  controllers: [ProductVariationsAdminController],
  providers: [ProductVariationsRepository, ProductVariationImageRepository],
})
export class ProductVariationsAdminModule {}
```

그렇다면 이제 controller와 service 코드를 살펴보자

### Controller

```js
export class UploadPvSubImagesAdminRequestDto {
  @ApiProperty()
  images: Express.Multer.File[];
}

  @ApiBody({ type: UploadPvSubImagesAdminRequestDto })
  @ApiConsumes('multipart/form-data')
// 이 end-point 가 multipart/form-data를 받는다는 것을 명시
  @UseInterceptors(FilesInterceptor('image'))
  @ApiOperation({ summary: 'PV 추가 image들 업로드' })
  @Post(':id/sub-images')
  async updatePvAdditionalImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.MulterS3.File[],
  ) {
    return await this.pvsAdminService.createPvSubImages(id, images);
  }
```

컨트롤러 코드를 작성하면서 헷갈린 부분이 많았는데 내가 헷갈렸던 포인트를 몇가지 적어보자면

- 우선 `FileInterCeptor`라는 인터셉터를 만들어 주어야 한다.

  > ### FileInterCeptor?
  >
  > - `FileInterCeptor`는 multer 라이브러리를 nestJs에서 쉽게 사용할 수 있또록 도와주는 인터셉터이다.
  > - multer는 form-data로 전송된 파일을 파싱하여 서버에 저장하는 역할을 하는데, 이 때 FilesInterceptor를 사용하면 요청으로부터 파일을 추출하여, 추출된 파일들의 metadata를 쉽게 가져올 수 있다.
  >
  > #### Interceptor가 뭔데?
  >
  > - intercept는 낚아채다라는 단어
  > - 프로그래밍에서 인터셉터는 `사용자의 요청을 가로채는 역할`을 한다.

그래서 아래의 데코레이터에 대해서 설명을 하자면,

```js
@UseInterceptors(FilesInterceptor('image'))
```

- FileInterCeptor라는 인터셉터를 사용할거고, image라는 필드 이름을 가진 애들을 데려올거야~ 라고 이해했다.
- 이 `image`라는 키 이름은, 클라이언트에서 form-data에 append할 때의 key이름과 같아야 한다. (이 부분도 처음에 images라고 했다가 잘 안되어서 헷갈렸음 ㅠ)
- 그리고 파일이 하나이면 `FileInterCeptor` 단수형으로, 여러개이면 `FilesInterCeptor`이라고 꼭 복수형을 써주어야 한다.

### Service

- 서비스 코드는 뭐! 이제 내가 받은 파일을 어떻게 처리할 것인지에 대해서 기능 구현을 해주면 된다.
- 이부분은 아마 어떤 기능을 구현할지에 따라 다르기 때문에 .. 그냥 하고싶은대로 하면 됨
- 내가 작성한 코드는, 이미지들을 S3에 올리고, 새로 업로드된 파일들에 position을 추가하여 images레포지토리에 저장하는 코드이다.

```js
  async createPvSubImages(
    id: number,
    images: Express.MulterS3.File[],
  ): Promise<ProductVariation> {
    const existingFiles = await this.productVariationImageRepository.find({
      where: {
        productVariationId: id,
      },
    });
    let nextPosition: number;
    if (existingFiles.length) {
      nextPosition = Math.max(...existingFiles.map((el) => el.position)) + 1;
    } else nextPosition = 0;

    for (let index = 0; index < images.length; index++) {
      await this.productVariationImageRepository.save({
        productVariationId: id,
        url: `${this.cloudFrontUrl}/${images[index].key}`,
        position: nextPosition + index,
      });
    }

    return await this.getPv(id);
  }
```

### 느낀 점

파일 업로드를 클라이언트 단에서 구현해본 경험은 있지만, 서버쪽도 만들어보게 될 줄은 몰랐다

회사 코드 중에 단일 파일 업로드 하는 코드가 있어서, 참고해서 작성해보았는데 파일이 여러개 되면서 쉽지만은 않았다..

블로그로 찬찬히 글을 써보려 하니, 개념적으로 부족한 부분이 많았고, 이것저것 좀 더 찾아보면서 글을 마무리 해보니 많은 공부가 되었던 것 같다 ~!
