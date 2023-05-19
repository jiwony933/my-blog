---
title: 'sql 문법을 공부해보자'
date: '2023-01-14'
category: 'database'
summary: 'sql 공부 day1 시작이 반이다!!'
---

예전부터 대문자로 작성된 sql 문법이 아주 예뻐보여서 배워보고 싶다고 생각했으나.. 딱히 계기가 없어서 차일피일 미루던 도중

회사에서 다른 사람이 쓰던 맥북 프로를 받았는데 data grip이 세팅이 되어있었고, 이참에 sql 문법을 배워서 데이터베이스에 익숙해져보자 라고 다짐하며 오늘부터 인강을 듣기 시작

> ## SQL
>
> Structured Query Language  
> 데이터베이스와 대화하기 위해 특별히 디자인된 언어

### 1\. `SELECT`

- 보고싶은 데이터 coloumn를 뽑아낼 때 사용

```sql
SELECT *
FROM order_list // 주문 리스트 전체 테이블 확인하기

SELECT phoneNumber // 주문 리스트에서 핸드폰 번호만 뽑아보기
FROM order_list
```

- \*은 전체 항목

### 2\. `ORDER BY`

- 정렬할 때 사용하는 문법

```sql
SELECT *
FROM ORDER_LIST
ORDER BY amount // 금액에 따라 정렬
ORDER BY amount desc // 내림차순
ORDER BY amount, quantity // 여러 항목을 넣을수도 있음

```

### 3\. `GROUP BY` / `COUNT`

- group by : 그룹화 하여 데이터 조회
- count : 특정 테이블에 들어있는 데이터 전체 개수

```sql
SELECT order_status, count(*)
FROM order_list
GROUP BY order_status
// 주문 상태별로 데이터 개수를 파악
```

- group by는 중복 제거를 할 때에도 자주 사용

### 4\. `WHERE` / `AND` / `OR`

- where : 테이블의 모든 데이터가 아닌 일부 데이터만 보고자 할 때 사용
- and : 조건을 동시에 만족
- or : 조건을 하나라도 만족

```sql
SELECT *
FROM order_list
WHERE status='결제완료'

// status가 '결제완료'인 데이터만 추출

SELECT *
FROM order_list
WHERE status='결제완료'
AND quantity=2

// status가 '결제완료'이고 quantity가 2인 데이터 추출
```

> #### 문제 풀어보면서 익히기
>
> 동물 보호소에 들어온 동물 중 젊은 동물1의 아이디와 이름을 조회하는 SQL 문을 작성해주세요. 이때 결과는 아이디 순으로 조회해주세요.  
> [https://school.programmers.co.kr/learn/courses/30/lessons/59037](https://school.programmers.co.kr/learn/courses/30/lessons/59037)
>
> ```sql
> SELECT ANIMAL_ID, NAME
> FROM ANIMAL_INS
> // ANIMAL_INS 에서 ID랑 NAME을 추출할건데
> WHERE INTAKE_CONDITION != "aged"
> // INTAKE_CONDITION 이 aged가 아닌 것
> ORDER BY ANIMAL_ID
> // ID를 기준으로 정렬해주세요~
> ```

### 5\. `CASE WHEN` / `ELSE`

- case when : 데이터의 값이 특정 조건일 때 새로운 값을 지정
- 데이터를 범주화 하거나, 읽기 쉽게 바꿔주는 역할을 함
- else : 기타 표현 내용

```sql
SELECT name, score
	  ,CASE WHEN score <= 60 THEN "C등급"
      	    WHEN score <= 80 THEN "B등급"
        // 첫번째 조건에서 60 이하가 걸러졌기 때문에
        // B 등급은 60 초과 80 이하가 됨
            WHEN score <= 100 THEN "A등급"
            ELSE "점수 오류"
        END
FROM score_list
```

### 6\. `LIKE` / `NOT LIKE`

- like : 특정 단어가 포함되는 조건
- not like : 특정 단어가 포함되지 않는 조건
- % <= 단어 앞뒤로 붙였을 때 어떤 것이든 상관없다는 뜻

```sql
SELECT *
FROM student_list
WHERE name LIKE '%지원%'
// name에 지원 이라는 글자가 포함된 것 뽑기
// % <= 지원 앞뒤로 어떤 것이든 상관없다는 뜻

WHERE name LIKE '%지원'
// "김지원"은 나오지만, "지원지"과 같은 단어는 안나옴
```

### 7\. sub query

- sub query를 사용하면 내가 가공한 쿼리를 재사용 할 수 있음

```sql
SELECT *
// 소괄호 시작 부터 서브 쿼리
FROM (
	SELECT dong,COUNT(*) cnt
    FROM apt_list
    GROUP BY dong
    //  dong별로 데이터 개수를 count한 테이블을 만들고
) a
WHERE cnt>100
// 서브 쿼리에서 만들어진 동별 데이터개수 테이블 에서, 데이터개수가 100개 이상인 것들만 추출
```

### 8\. `JOIN`

- 하나의 쿼리에 여러개의 테이블을 묶어서 사용

join의 개념을 이해하기 어려워서 생활 코딩 영상을 찾아보다가  
sql visulizer 라는 사이트를 알게 되었는데 이해하는데에 도움이 되었다

#### `INNER JOIN`

![](https://velog.velcdn.com/images/jiwonyyy/post/0ab4c70d-1da7-4119-8167-4cc3be4cdc2a/image.png)

- 기준 테이블과 조인 테이블 모두 데이터가 존재해야 조회 됨

#### `LEFT JOIN`

![](https://velog.velcdn.com/images/jiwonyyy/post/3f6d9bae-e476-4806-bb66-3a918fd308e0/image.png)

- 기준 테이블에만 데이터가 존재하면 조회됨

> #### JOIN 관련 문제 풀어보면서 익히기
>
> 아직 입양을 못 간 동물 중, 가장 오래 보호소에 있었던 동물 3마리의 이름과 보호 시작일을 조회하는 SQL문 작성하기\\sql visualizer에 의하면  
> ![](https://velog.velcdn.com/images/jiwonyyy/post/d80a65e7-debc-4133-b446-0270336d5c8d/image.png)  
> 요런 데이터가 나와야 한다
>
> 그래서 작성한 코드는
>
> ```sql
> SELECT INS.NAME, INS.DATETIME
> FROM ANIMAL_INS INS
> LEFT JOIN ANIMAL_OUTS OUTS
> ON INS.ANIMAL_ID=OUTS.ANIMAL_ID
> WHERE OUTS.ANIMAL_ID IS NULL
> // left join 을 한 후, 입양 간 동물 테이블에서 id 값이 null인 데이터들(= 입양을 가지 못함)
> ORDER BY DATETIME
> LIMIT 3
> ```

### 9\. `SUM` / `MIN` / `MAX` / `AVG`

- sum : 합계
- min : 최소값
- max : 최대값
- avg : 평균값

```sql
SELECT SUM(score)
	   MIN(score)
       MAX(score)
       AVG(score)
FROM score_list
GROUP BY className

// 반별로 점수 합계/최저점수/최고점수/평균점수
```

sql 문법 기초를 하루 정도 공부해봤는데  
엑셀 하는 것 같기도 하고 참 재밌다(?)  
특히 JOIN을 잘 활용하면 데이터 베이스를 무궁무진하게 사용할 수 있지 않을까..  
programmers 문제 틈틈이 풀어보면서 익숙해지도록 노력해야지

> ### reference
>
> [https://www.youtube.com/watch?v=ZsYnTSSuSiw](https://www.youtube.com/watch?v=ZsYnTSSuSiw)  
> [https://youtu.be/2Xa54XBXbk0](https://youtu.be/2Xa54XBXbk0)
