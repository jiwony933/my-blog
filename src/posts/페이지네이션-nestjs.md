---
title: '📄 페이지네이션 구현하기(front, back)'
date: '2023-10-28'
category: 'client'
summary: '프론트에서는 페이지네이션을 어떻게 보여주고, 백에서는 어떻게 보내줘야할까?'
pinned: true
---

페이지네이션을 구현하는 방식에 대해서 써보려고 한다.

프론트에서는 페이지네이션을 어떻게 보여줘야 하고,
백엔드에서는 페이지에 대한 정보를 어떻게 보여줘야하는지에 대해 알아보자.

대략적인 내용은 다음과 같다.
![](https://velog.velcdn.com/images/jiwonyyy/post/730d6d60-ac05-416b-b28c-e38e75eea119/image.png)

# front

- stack : Next.js (react)

react(Next.js)로 페이지네이션이 가능한 공통 컴포넌트를 만들어보자.

## 구현 기능

1. 페이지 번호 선택하여 페이지 이동
2. 페이지 수는 10개 단위로 보이게 하기 (`1~10` / `11~20` 등)
3. 이전페이지, 다음페이지, 마지막페이지, 첫페이지 이동 등

- 서버에서 데이터는 아래와 같은 구조로 온다.

```js
export interface ProductsResponse {
  paging: Paging;
  products: Product[];
}

export interface Paging {
  currentPage: number;
  totalPage: number;
}
```

## 컴포넌트 구조

컴포넌트 구조는 대략 아래와 같을 것이다.
props로는 currentPage, totalPage, 그리고 버튼 클릭 시 작동시킬 onChangePage 함수를 받으면 된다.

```js
<컨테이너>
  <제일첫페이지로가기 /> // 1페이지로 이동
  <이전페이지로가기 /> // current -1 페이지로 이동
  <페이지1 />
  <페이지2 />
  <페이지3 />
  ...
  <페이지10 />
  <다음페이지로가기 /> // current +1 페이지로 이동
  <제일마지막페이지로가기 /> // totalPage로 이동
</컨테이너>
```

그렇다면 차근차근 만들어보자

## 페이지 계산하기

우선 보여줄 페이지 리스트를 계산해야 한다.
예를 들어, totalPage가 17인 경우에는 `1~10`, `11~17` 이렇게 버튼들을 보여줘야 한다.

### 1. 현재 페이지가 속해있는 페이지 그룹(?)에 몇개의 페이지가 있는지를 계산해야 한다.

- 전체 페이지 / 10 을 올림한 값이, (현재페이지 -1) / 10을 올림한 값보다 크면 페이지 10개를 다 보여주고,
- 그 반대일 경우, totalPage / 10의 나머지 개수 만큼 보여줘야 한다. (페이지네이션 마지막 그룹이 된다.)

```js
const currentPageCount: number =
  Math.floor(totalPage / 10) > Math.floor((currentPage - 1) / 10)
    ? 10
    : totalPage % 10;
```

> ex) 전체 페이지를 17이라고 가정하였을 때,
> Math.floor(17/10)은 2가 되고,
>
> - 9페이지를 보여주는 경우 Math.floor(9/10)은 1이 되어 10개 (1~10까지 보여주기)
> - 11페이지를 보여주는 경우 Math.floor(11/10)은 2가 되므로 7개(11~17)를 보여주어야 한다.

### 2. 해당 페이지 그룹의 페이지 넘버들을 배열로 만들기

- 1번에서 받은 pageCount 개수대로 0을 채운 배열을 만들고,

```js
new Array(currentPageCount).fill(0);
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

- 이 배열을 map을 사용해서 페이지 넘버들을 채울 것이다.
- 이때 중요한 것은 페이지 그룹에서 제일 작은 페이지 넘버를 찾는 것인데,

> - 1~10 인 경우 1이 되어야 함
> - 11~20 인 경우 11이 되어야 함
> - 21~30 인 경우 21이 되어야 함

- 현재 페이지에서 1을 빼고, 10을 나눈 것을 올림하면 0, 1, 2와 같이 10단위 수가 나온다.
- 여기에 다시 10을 곱하고 1을 더해주면 원하는 페이지 그룹 내 첫번째 넘버를 구할 수 있다.

```
1 + Math.floor((currentPage - 1) / 10) * 10
```

이를 통해 완성된 currentPages 배열은 아래와 같다.
useMemo를 감싸줌으로써, 불필요한 연산이 계속 발생하지 않게 해둔다.

```js
const currentPages: number[] = useMemo(() => {
  const currentPageCount: number =
    Math.floor(totalPage / 10) > Math.floor((currentPage - 1) / 10)
      ? 10
      : totalPage % 10;

  return new Array(currentPageCount)
    .fill(0)
    .map((_, i) => i + 1 + Math.floor((currentPage - 1) / 10) * 10);
}, [currentPage, totalPage]);
```

## changePage 함수 만들기

- pageChange가 일어났을 때 작동시킬 함수는 props로 받았기 때문에, 해당 page number를 받아 해당 함수를 실행시키는 changePage 함수만 만들어두면 된다.

```js
const changePage = (page: number) => {
  onPageChange(page);
};
```

## Button Disabled가 필요한 부분

아래와 같은 경우는 button에 disabled 속성을 주어, 버튼이 활성화되지 않도록 해야한다.

- 1페이지인 경우 `이전페이지로 가기`, `제일 첫페이지로 가기`
- 마지막페이지인 경우 `다음페이지로 가기`, `제일 마지막페이지로 가기`

## 전체 코드

```js
import ArrowLeftIcon from 'assets/icons/ArrowLeftIcon';
import ArrowRightIcon from 'assets/icons/ArrowRightIcon';
import DoubleArrowLeftIcon from 'assets/icons/DoubleArrowLeftIcon';
import DoubleArrowRightIcon from 'assets/icons/DoubleArrowRightIcon';
import { useMemo } from 'react';
import { Container, PageButton } from './styles';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPage, onPageChange } = props;
  const currentPages: number[] = useMemo(() => {
    const currentPageCount: number =
      Math.floor(totalPage / 10) > Math.floor((currentPage - 1) / 10)
        ? 10
        : totalPage % 10;

    return new Array(currentPageCount)
      .fill(0)
      .map((_, i) => i + 1 + Math.floor((currentPage - 1) / 10) * 10);
  }, [currentPage, totalPage]);

  const changePage = (page: number) => {
    onPageChange(page);
  };

  return (
    <Container>
      <PageButton onClick={() => changePage(1)} disabled={currentPage === 1}>
        <DoubleArrowLeftIcon width={16} height={16} />
      </PageButton>
      <PageButton
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon width={16} height={16} />
      </PageButton>

      {currentPages.map((page) => (
        <PageButton
          onClick={() => changePage(page)}
          disabled={currentPage === page}
          key={page}
        >
          {page}
        </PageButton>
      ))}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <ArrowRightIcon width={16} height={16} />
      </PageButton>
      <PageButton
        onClick={() => onPageChange(totalPage)}
        disabled={currentPage === totalPage}
      >
        <DoubleArrowRightIcon width={16} height={16} />
      </PageButton>
    </Container>
  );
};

export default Pagination;
```

페이지네이션을 구현할 때에

1. 페이지 그룹 내에 보여줄 페이지 개수,
2. 페이지 그룹 내에서 제일 첫번째 페이지 넘버

이 두가지를 계산하는게 처음에 약간 헷갈렸는데
예시 숫자를 가지고 이리저리 해보다보니 방법을 찾아낼 수 있었다.

# Back

- stack : NestJS

데이터를 보내줄때 페이징을 해서 보내주는 코드는 재사용될 확률이 매우 높은 코드이다.
그렇기 때문에 PagingManager라는 class를 만들어서 관리해보도록 하자.

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
      currentPage: this.currentPage,
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
