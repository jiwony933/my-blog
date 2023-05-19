---

title: '[sql에러] [1093] You can't specify target table for update in FROM clause'
date: '2023-05-06'
category: ''
summary : 'You can't specify target table 'orderitemhistories' for update in FROM clause 업데이트 문 작성 시 에러 발생!'

---

sql 업데이트 문을 작성하다가, 에러를 만나서 기록해본다.

```sql
update order_item_histories set status = '국내배송중'  where status = '출고진행중' and id in (
select id from order_item_histories where order_item_id in
(select id from order_items where status = '출고진행중' and order_id LIKE '16%') and status = '출고진행중');
```

처음에 위와같이 업데이트 문을 작성하였더니, 아래와 같은 에러가 발생하였다.

> \[HY000\]\[1093\] You can't specify target table 'order_item_histories' for update in FROM clause

## why?

UPDATE 나 DELETE 시 자기 테이블의 데이타를 바로 사용 못하므로 아래와 같은 SQL 을 실행시 1093 에러가 발생한다.

이것은 MySQL의 특징으로 데이터를 추가나 갱신할 경우 동일한 테이블로 서브쿼리를 사용할 수 없도록 되어 있기 때문이다. oracle이나 Postgresql에는 정상적으로 작동한다고 한다.

## how?

이를 해결하기 위해서는 자기 테이블의 결과를 바로 사용하지말고, sub query 결과를 한번 더 감싸서 임시 테이블로 저장한 다음에 사용하면 문제 없이 업데이트가 된다.

아래와 같이 수정하여 해결!

```sql
UPDATE order_item_histories
SET status = '국내배송중'
WHERE status = '출고진행중'
AND id IN (
  SELECT temp.id
  FROM (
    SELECT id
    FROM order_item_histories
    WHERE order_item_id IN (
      SELECT id
      FROM order_items
      WHERE status = '출고진행중'
      AND order_id LIKE '16%'
    )
    AND status = '출고진행중'
  ) AS temp
);

```

> ### Reference
>
> [https://www.lesstif.com/dbms/mysql-error-1093-you-can-t-specify-target-table-tablename-for-update-in-from-clause-18220088.html](https://www.lesstif.com/dbms/mysql-error-1093-you-can-t-specify-target-table-tablename-for-update-in-from-clause-18220088.html)
