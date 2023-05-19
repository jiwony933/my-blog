---
title: '[mysql] 뷰에 대해서 알아보자'
date: '2023-03-04'
category: ''
summary: 'create VIEW !'
---

## VIEW

view란 DB의 가상 테이블을 의미한다.  
뷰는 실제 데이터와 마찬가지로 column과 데이터를 보여주지만, 실제로 데이터를 저장하고 있지는 않다.

아래 캡처화면은 상품의 각종 정보를 특정 계산식으로 계산한 order_price와 purchase_cost를 보여주는 view이다.  
![](https://velog.velcdn.com/images/jiwonyyy/post/7b39989e-30e7-4ec1-aa87-7293dd278663/image.png)

마치 원래 있던 테이블 마냥 감쪽같다!

이 테이블을 볼때도 그냥 `SELECT`문으로 불러올 수 있다.

```sql
SELECT *
FROM purchase_costs
```

## 뷰 생성하기

- 뷰를 생성하는 것은 매우 간단하다.
- `SELECT` 문을 사용하여 원하는 데이터 테이블 형태를 만든 후, 앞에 `CREATE VIEW 뷰_이름 AS` 만 붙여주면 된다.

```sql
CREATE VIEW 뷰_이름 AS
	SELECT ~~~~~
```

- 뷰를 생성한 이후에는, 다른 테이블과 마찬가지로 `SELECT` 문을 사용하여 데이터를 확인할 수 있다.
- tables 아래에 views라는 경로에 생성됨  
  ![](https://velog.velcdn.com/images/jiwonyyy/post/94117117-9a8c-4f36-be09-a1ce08454108/image.png)

## 뷰를 사용하였을 때의 장점

- 한번 저장해 두면 사용할 때마다 쿼리문을 쓰지 않아도 되고, 계속해서 사용이 가능하다.
- 사용자에게 보여주고 싶은 정보만 보여줄 수 있어서 보안에도 도움이 됨.
- 기존 컬럼을 사용하여 새로운 계산값을 만들어 냈을 때에 편리하고 데이터의 무결성을 가질 수 있다.

```null
ex) 상품 크기, 무게, 배송방법 등으로 배송비 계산하여 배송비 컬럼이 있는 view 만들어두기
- 기존 테이블에 배송비 컬럼을 만들어 둔다면?
  관련된 데이터가 바뀔 때 무결성이 깨질 가능성이 있음
```

- 서버를 만들 때에도 인라인으로 쿼리문을 반복해서 쓰지 않아도 된다.

## 뷰를 사용하였을 때의 주의할 점

- 뷰도 결국 서브 쿼리를 만드는 것과 같다.
- 의미 없는 뷰를 무한 생성할 시에는 성능이 저하된다.
- 아래 캡처는 복잡한 계산이 들어가서 view 여러개를 join했더니.. 쿼리 실행이 너무 많아짐.

![](https://velog.velcdn.com/images/jiwonyyy/post/ea1dce8b-07c4-4e39-a323-dd067f97c003/image.png)

➡️ 요거 쿼리 실행 단계를 줄이는 방법은 좀 더 찾아봐야 할 것이다.

## 뷰 entity 만들기

typeORM + NestJs를 사용하는 경우는 아래와 같이 entity를 만들 수 있다.

- `@ViewEntity('view_name')` 데코레이터를 사용하여 View 엔티티를 정의한다.
- 각각의 컬럼은 `@ViewColumn()` 데코레이터를 사용한다.
- join되는 테이블이 있으면 `@OneToOne`, `@ManyToOne` 등을 사용하여 추가해두기

```js
@ViewEntity('total_costs')
export class TotalCost {
  @PrimaryColumn()
  skuId: number;

  @ViewColumn()
  salesPrice: number;

  @ViewColumn()
  orderPrice: number;

  @ViewColumn()
  purchaseCost: number; //제품매입원가

  @OneToOne(() => Sku, (sku) => sku.totalCosts)
  sku: Sku;
}
```

사용해보니 편리하고 좋다...!  
특히 데이터의 무결성을 유지하면서, 내가 원하는 정보를 한번에 볼 수 있다니..?  
하지만 엄청난 쿼리 실행을 축소할 수 있는 방법을 찾아야 겠다.
