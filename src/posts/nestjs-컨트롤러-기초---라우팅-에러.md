---
title: 'nestjs 컨트롤러 기초 + 라우팅 에러'
date: '2023-02-18'
category: ''
summary: 'nestjs로 컨트롤러 개념 공부하면서 복습하기 + 겪었던 에러 공유'
---

최근에 nestjs로 간단한 CRUD api를 구현하고 있는데, 블로깅을 하면서 개념 공부하면서 복습하기 + 겪었던 에러 공유

### 개요

예전에 컨트롤러, 서비스, 모듈 등에 대해 초등학생 수준의 설명을 들었던 적이 있는데 이해가 쉬웠다.

> 식당에서 음식을 주문한다 라고 생각을 했을 때
>
> - 컨트롤러 : 숟가락, 젓가락을 놔서 손님한테 서빙을 해주는 곳
> - 서비스 : 주문을 받고, 음식을 만들어 주는 곳
> - 레포지토리 : 쿼리로 필터링 등등의 작업을 하는 곳
> - 엔티티 : 데이터가 정의되어 있는 개체

오늘 작성할 숟가락, 젓가락을 놔서 손님한테 서빙을 해주는 그 `컨트롤러`는  
클라이언트의 요청을 처리하는 (적절한 응답을 반환하는) 역할을 한다.

### 컨트롤러 만들기

nestjs의 컨트롤러에서는 @Get(), @Post(), @Patch(), @Delete() 등의 데코레이터를 이용해서 http 요청 처리를 한다.

가장 기본적인 controller의 틀을 보면 아래와 같다.

```js
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
```

### 라우팅 경로 설정

여기서 경로를 설정해 주고 싶으면 데코레이터의 괄호 안에 적어주면 된다.

```js
// `/user/sayHello` 라는 경로로 Get요청을 보내는 코드

import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class AppController {
  @Get('sayHello')
  getHello(): string {
    return 'Hello World!';
  }
}
```

### 경로에 파라미터 넣기

전체 목록을 get하는 것 외에 id를 파라미터로, 상세정보를 get, patch, delete하려면,  
@Get(":id")와 같이, 요청 데코레이터 안에 id 파라미터를 넣어주면 된다.  
경로에 파라미터를 사용할 때는 @Param() 데코레이터를 함께 사용 해야 한다.

아래의 코드는 디자이너의 id로, 디자이너의 상세 정보를 GET하는 코드이다.

#### 코드 예시

```js
@ApiTags('Admin: Designer')
@Controller('admin/designers')
export class DesignersAdminController {
  constructor(private readonly designersAdminService: DesignersAdminService) {}

  @ApiOperation({ summary: '디자이너 상세 조회' })
  @Get(':id')
  async getDesigner(@Param('id', ParseIntPipe) id: number) {
    return await this.designersAdminService.getDesigner(id);
  }

```

위의 코드들과 달리, 좀 더 많은 것들이 생겨났는데..  
코드에 대한 설명을 적어보면

> 1.  우선 api경로는 `/api/admin/designers`가 될 것이다.
>
> ```js
> @Controller('admin/designers')
> ```
>
> 2.  그리고 DesignerAdminService를 주입받고 있다.
>
> ```js
> constructor(private readonly designersAdminService: DesignersAdminService) {}
> ```
>
> 3.  `@ApiTags`, `@ApiOperation` 데코레이터는 swagger(api 문서화)를 위한 것인데 이렇게 써주면, api에 대한 간단한 설명이 요렇게 보기 쉽게 나오는 것을 확인할 수 있다.
>
> ```js
> @ApiTags('Admin: Designer')
>   @ApiOperation({ summary: '디자이너 상세 조회' })
> ```
>
> ![](https://velog.velcdn.com/images/jiwonyyy/post/76101e1a-2bfe-45d9-886d-0b98e00338c8/image.png)  
> 4\. Get 요청 안에 id를 파라미터로 받고 있는데 이는 `/api/admin/designers/3`로 get요청을 보내면, 3번 id를 가진 디자이너의 상세 정보에 대한 get요청이 된다.  
> 5\. 요청을 받으면 designer service에 있는 getDesigner()의 반환값을 return해준다.
>
> ```js
>   @Get(':id')
>   async getDesigner(@Param('id', ParseIntPipe) id: number) {
>     return await this.designersAdminService.getDesigner(id);
>   }
> ```

### ❌컨트롤러 코드 작성 시 주의할 점❌

#### 에러 발생

사실 이번주 블로그 주제로 `컨트롤러`를 선정한 것은 바로 어제 겪었던 따끈따끈한 에러 때문이었다!  
OrderItems컨트롤러에 `GET /order-items/[id]`를 추가하면서 생긴 일이었다.

우선 기존의 코드는 아래와 같은데..

```js
@ApiTags('Order')
@Controller('order-items')
export class OrderItemsAdminController {
  constructor(
    private readonly orderItemsAdminService: OrderItemsAdminService,
  ) {}

  @ApiOperation({ summary: '주문 상품 목록 조회' })
  @Get()
  async getOrderItems(@Query() query: GetOrderItemsAdminRequestDto) {
    return await this.orderItemsAdminService.getOrderItems(query);
  }


  // 새로 추가된 부분
  @ApiOperation({ summary: '주문 상품 상세 조회 (어드민)' })
  @Get(':id')
  async getOrderItem(@Param('id') id: number) {
    return await this.orderItemsAdminService.getOrderItem(id);
  }


  // 기존에 있던 부분
  @ApiOperation({ summary: '변경 가능한 주문 상품 상태 목록 조회' })
  @Get('changable-statuses')
  getChangableOrderItemStatuses() {
    return this.orderItemsAdminService.getChangableOrderItemStatuses();
  }
}
```

잘만 실행되던 `GET /order-items/chagable-statuses`가 자꾸 500에러가 뜨는 것이었다...  
`GET /order-items/chagable-statuses`은 DB랑 아무 관련이 없고, 그냥 string 배열을 응답해주는 메서드였는데  
왜자꾸.. 데이터베이스 관련 에러가 뜨는건지!!!  
![](https://velog.velcdn.com/images/jiwonyyy/post/3a16fbae-e4a2-4d91-bbb9-e204fcddaed8/image.png)

#### 문제 & 해결

결론은 컨트롤러에 작성된 요청의 순서가 문제였다..!  
`getOrderItem(id)`를 제일 아래로 내리니, 에러가 해결되었다.

```js
  @ApiOperation({ summary: '주문 상품 상세 조회 (어드민)' })
  @Get(':id')
  async getOrderItem(@Param('id') id: number) {
    return await this.orderItemsAdminService.getOrderItem(id);
  }
```

처음 코드는 Get(':id')와 Get() 라우트가 정의된 이후에 Get('changable-statuses')가 정의되어 있다.  
NestJS의 라우팅 시스템은 URL 패턴을 분석하고 첫 번째로 매치되는 라우트 핸들러를 실행한다고 한다.

내가 작성한 코드에서는 URL이 `/order-items/changable-statuses` 이므로,  
`Get(':id')` 라우트 `/order-items/123` 과 같은 패턴으로 인지되는 것이다. `Get(':id')` 이 핸들러는 id 매개변수를 요구하고 있지만, 이 `Get('changable-statuses')`에는 id가 없으므로 예외가 발생하고 500 에러가 발생하게 된 것이었다..!

컨트롤러 작성 시에는 순서에도 꼭! 신경을 써서 작성해야 한다는 교훈을 얻었다!

코드를 하나하나 이어붙이며 쓰다가, 블로그로 정리를 해보니 좀 더 이해하는데에 도움이 되었다.  
nest 마스터(?)가 되는 그날까지.. 화이팅!
