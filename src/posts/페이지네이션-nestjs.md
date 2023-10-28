---
title: '📄 페이지네이션 서버에서 관리하기 (paging manager)'
date: '2023-10-28'
category: 'server'
summary: 'nest js에서 페이징 관리하기'
pinned: true
---

오늘은 서버에서 페이지네이션을 하는 방법을 써보도록 할 것이다.

PagingManager라는 class를 만들어서 관리해보도록 하자.

## 1. pagingManager 클래스 만들기

아래와 같은 4개의 파라미터를 받아 페이지네이션을 실행시킬 것이다.

> totalRowCount: 전체 행 수
> size: 페이지 크기 (한 페이지에 표시되는 항목 수)
> page: 현재 페이지 번호
> query: TypeORM의 `SelectQueryBuilder<T>` 인스턴스

```js
import { SelectQueryBuilder } from 'typeorm';

export class PagingManager<T> {
  private readonly totalPage: number;
  private readonly currentPage: number;

  constructor(
    private readonly totalRowCount: number,
    private readonly size: number,
    private readonly page: number,
    private readonly query: SelectQueryBuilder<T>,
  ) {}
}
```

## 2. total page, current page 계산하기

- total page는 (전체 행수 / page size) 를 올림한 것이다.
- 현재 페이지는 페이지가 1보다 작으면 1로 설정, 페이지가 전체 페이지 수를 초과하면 마지막 페이지로 설정, 그 외의 경우에는 주어진 페이지 번호로 설정한다.

```js
this.totalPage = Math.ceil(this.totalRowCount / this.size) || 1;
this.currentPage =
  this.page < 1
    ? 1 // 페이지가 1보다 작으면 1로 설정
    : this.page > this.totalPage
    ? this.totalPage // 페이지가 전체 페이지 수를 초과하면 마지막 페이지로 설정
    : this.page; // 그 외의 경우에는 주어진 페이지 번호로 설정
```

## 3. pagination된 쿼리 생성하기

- take, skip 으로 페이지네이션된 쿼리를 생성하는 `pagedQuery()` 함수를 만든다.₩

```js
  get pagedQuery() {
    return this.query.take(this.size).skip(this.size * (this.currentPage - 1));
  }
```

- take: 현재 페이지의 크기(페이지당 표시될 항목 수)를 설정.
- skip: 현재 페이지 이전의 항목들을 건너뛰고 현재 페이지의 첫 항목을 선택.

### 잠깐, take, skip vs limit, offset

- limit은 select 당시에 limit을 먼저 실행한 후 join을 실행
  (조인을 사용하는 경우 limit 및 offset이 원하는 대로 적용되지 않을 수 있다.)
- take은 먼저 join까지 적용하여 모든 select를 한 후에 mapping하여 페이징

## 4. pagination 정보가 담긴 객체 반환하기

- prevPage, currentPage, nextPage, totalPage가 담긴 객체를 반환하는 `paging()` 함수를 만들어 준다.

```js
  get paging() {
    return {
      prevPage: this.currentPage <= 1 ? 1 : this.currentPage - 1,
      currentPage: this.currentPage,
      nextPage:
        this.currentPage >= this.totalPage
          ? this.totalPage
          : this.currentPage + 1,
      totalPage: this.totalPage,
    };
  }
```

## 전체 코드

```js
import { SelectQueryBuilder } from 'typeorm';

export class PagingManager<T> {
  private readonly totalPage: number;
  private readonly currentPage: number;

  constructor(
    private readonly totalRowCount: number,
    private readonly size: number,
    private readonly page: number,
    private readonly query: SelectQueryBuilder<T>,
  ) {
    this.totalPage = Math.ceil(this.totalRowCount / this.size) || 1;
    this.currentPage =
      this.page < 1
        ? 1
        : this.page > this.totalPage
        ? this.totalPage
        : this.page;
  }

  get pagedQuery() {
    return this.query.take(this.size).skip(this.size * (this.currentPage - 1));
  }

  get paging() {
    return {
      prevPage: this.currentPage <= 1 ? 1 : this.currentPage - 1,
      currentPage: this.currentPage,
      nextPage:
        this.currentPage >= this.totalPage
          ? this.totalPage
          : this.currentPage + 1,
      totalPage: this.totalPage,
    };
  }
}

```

## 사용하기

- list를 받아오는 API에서 아래와 같이 사용하면 된다.

```js
  async getProducts(
    queryParams: GetProductsAdminRequestDto,
  ): Promise<GetProductsAdminResponseDto> {
    const countQuery = await this.productsRepository.getFilteredCountQuery(
      queryParams,
    );
    const query = await this.productsRepository.getFilteredQuery(queryParams);

    const { page, size } = queryParams;
    const pagingManager = new PagingManager(
      await countQuery.getCount(),
      size,
      page,
      query,
    );

    return {
      paging: pagingManager.paging,
      products: await pagingManager.pagedQuery.getMany(),
    };
  }
```
