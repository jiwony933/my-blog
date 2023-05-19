---
title: '[custom hooks] 아코디언 테이블 커스텀훅으로 만들기'
date: '2023-04-29'
category: ''
summary: '테이블을 만들고, 각 row에 하위 데이터들을 펼쳤다 닫았다 볼 수 있는 토글 형태의 아코디언 테이블 리스트를 만들었다. 생각보다 여기저기 사용할 일이 많길래 custom hooks로 만들어보았다!'
---

테이블을 만들고, 각 row에 하위 데이터들을 펼쳤다 닫았다 볼 수 있는 토글 형태의 테이블 리스트를 만들었다.  
한 페이지에서 만들었는데, 생각보다 여기저기 사용할 일이 많길래 custom hooks로 만들어보았다!

![](https://velog.velcdn.com/images/jiwonyyy/post/4740d105-f45c-4dbe-9916-28df18a01dd0/image.png)

![](https://velog.velcdn.com/images/jiwonyyy/post/3e4accf6-fc6e-4347-9a84-b5b96cf03512/image.png)

우선 리팩토링 전 기본 컴포넌트 코드를 살펴보면 아래와 같다

```js
const ProductPvInfoTable = ({ pvs }: P) => {
  const [openedPvIds, setOpenedPvIds] = useState<number[]>([]);
  const handlePvOpen = (id: number) => {
    setOpenedPvIds([...openedPvIds, id]);
  };
  const handlePvClose = (id: number) => {
    setOpenedPvIds(openedPvIds.filter((openPvId) => openPvId !== id));
  };

  return (
    <Container gap={16}>
      <ContentH2Title>PV 정보</ContentH2Title>
      <FlexEndBox>
        {openedPvIds.length ? (
          <button
            onClick={() => {
              setOpenedPvIds([]);
            }}
          >
            <FlexBox gap={10}>
              <span>접기</span> <ArrowDownIcon width={18} />
            </FlexBox>
          </button>
        ) : (
          <button
            onClick={() => {
              setOpenedPvIds(pvs.map((pv) => pv.id));
            }}
          >
            <FlexBox gap={10}>
              <span>모두 펼치기</span> <ArrowRightIcon width={18} />
            </FlexBox>
          </button>
        )}
      </FlexEndBox>
      <Table clickable>
        <thead>
          <tr>
            {TABLE_ROW.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pvs.map((pv) => (
            <>
              <tr key={pv.id}>
                <td>
                  <SpaceBetweenBox>
                    {pv.skus.length}
                    {openedPvIds.includes(pv.id) ? (
                      <button onClick={() => handlePvClose(pv.id)}>
                        <ArrowDownIcon />
                      </button>
                    ) : (
                      <button onClick={() => handlePvOpen(pv.id)}>
                        <ArrowRightIcon />
                      </button>
                    )}
                  </SpaceBetweenBox>
                </td>
                <td>{pv.id}</td>
                <td>브랜드명</td>
                <td>상품명</td>
                <td>모델명</td>
                <td>{pv.colorId}</td>
              </tr>
              {openedPvIds.includes(pv.id) && (
                <SkuTr>
                  <td colSpan={TABLE_ROW.length}>
                    <SkuTableContainer>
                      <h2> 하위 sku 정보</h2>
                      <SkuTable>
                        <thead>
                          <tr>
                            {TABLE_ROW_SKU.map((column) => (
                              <th key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {pv.skus.map((sku) => (
                            <tr key={sku.id}>
                              <td>{sku.id}</td>
                              <td>{'공급사'}</td>
                              <td>{sku.stock}</td>
                              <td>{sku.isVisible ? 'Y' : 'N'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </SkuTable>
                    </SkuTableContainer>
                  </td>
                </SkuTr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
```

다시보니 엄청 지저분하군요 ㅋ

### hook에서 필요한 기능을 추려보자면

1.  각각의 row 하나 하나를 열었다 닫았다 하는 기능
2.  전체 row를 한꺼번에 다 열거나, 다 닫는 기능
3.  각 row가 열려있는지 판단하는 값
4.  모든 row가 열려있는지 판단하는 값

### custom hooks 만들기

- 커스텀 훅을 만드는 것은 간단하다

1.  use로 시작하는 함수 만들기
2.  1에서 만든 함수 안에 필요한 변수, 함수 선언하기
3.  useState나 useEffect 등 react에서 사용하는 리액트 훅 등도 사용
4.  return 값에 반환할 값들을 적기
5.  원하는 곳에서 불러서 사용

## useToggleList 만들기

1\. 우선 useState로 open 되어있는 아이템들의 id를 담는 배열 state를 만든다.

```js
import { useState } from 'react';

export const useToggleList = (items: any[]) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
};
```

2\. 아이템들의 open 여부를 확인하는 함수 및 변수 만들기

```js
const isOpened = (itemId: number) => openedIds.includes(itemId);
const isAllOpened = openedIds.length === items.length;
```

3\. 각각의 아이템들을 열었다 닫았다 하는 toggleItem 함수 만들기

- id를 입력 받아서, openIds에 포함되어 있으면, 제거 (토글 닫기)
- openIds에 포함되어 있지 않으면, 추가 (토글 열기)

```js
const toggleItem = (itemId: number) => {
  if (isOpened(itemId)) {
    setOpenedIds(openedIds.filter((id) => id !== itemId));
  } else {
    setOpenedIds([...openedIds, itemId]);
  }
};
```

4.  전체 아이템을 한꺼번에 열거나 닫는 toggleAllItems 함수 만들기

- 전부 열려있으면, 빈배열로 만들어서 모두 닫기
- 반대면, openedIds에 모든 id를 넣어서 모두 열기

```js
const toggleAllItems = () => {
  if (isAllOpened) {
    setOpenedIds([]);
  } else {
    setOpenedIds(items.map((item) => item.id));
  }
};
```

그리하여 완성된 useToggleList 커스텀 훅

```js
import { useState } from 'react';

export const useToggleList = (items: any[]) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);

  const isOpened = (itemId: number) => openedIds.includes(itemId);
  const isAllOpened = openedIds.length === items.length;

  const toggleItem = (itemId: number) => {
    if (isOpened(itemId)) {
      setOpenedIds(openedIds.filter((id) => id !== itemId));
    } else {
      setOpenedIds([...openedIds, itemId]);
    }
  };

  const toggleAllItems = () => {
    if (isAllOpened) {
      setOpenedIds([]);
    } else {
      setOpenedIds(items.map((item) => item.id));
    }
  };

  return { toggleItem, toggleAllItems, isOpened, isAllOpened, openedIds };
};
```

### custom hooks로 코드를 다시 정리해보면

#### 1\. 함수 선언 부분

```js
// before
  const [openedPvIds, setOpenedPvIds] = useState<number[]>([]);
  const handlePvOpen = (id: number) => {
    setOpenedPvIds([...openedPvIds, id]);
  };
  const handlePvClose = (id: number) => {
    setOpenedPvIds(openedPvIds.filter((openPvId) => openPvId !== id));
  };

// after
 const { toggleItem, toggleAllItems, isOpened, isAllOpened } =
    useToggleList(pvs);

```

#### 2\. 전체 여닫기 버튼 작동 부분

```js
// before
{
  openedPvIds.length ? (
    <button
      onClick={() => {
        setOpenedPvIds([]);
      }}
    >
      <FlexBox gap={10}>
        <span>접기</span> <ArrowDownIcon width={18} />
      </FlexBox>
    </button>
  ) : (
    <button
      onClick={() => {
        setOpenedPvIds(pvs.map((pv) => pv.id));
      }}
    >
      <FlexBox gap={10}>
        <span>모두 펼치기</span> <ArrowRightIcon width={18} />
      </FlexBox>
    </button>
  );
}

// after
<button onClick={toggleAllItems}>
  <FlexBox gap={10}>
    {isAllOpened ? (
      <>
        <span>접기</span> <ArrowDownIcon width={18} />
      </>
    ) : (
      <>
        <span>모두 펼치기</span> <ArrowRightIcon width={18} />
      </>
    )}
  </FlexBox>
</button>;
```

#### 3\. 각각의 행 여닫기 버튼 작동

```js
// before
             <td>
               <SpaceBetweenBox>
                 {pv.skus.length}
                 {openedPvIds.includes(pv.id) ? (
                   <button onClick={() => handlePvClose(pv.id)}>
                     <ArrowDownIcon />
                   </button>
                 ) : (
                   <button onClick={() => handlePvOpen(pv.id)}>
                     <ArrowRightIcon />
                   </button>
                 )}
               </SpaceBetweenBox>
             </td>

// after
           <td>
               <SpaceBetweenBox>
                {pv.skus.length}
                 <button onClick={() => toggleItem(pv.id)}>
                   {isOpened(pv.id) ? <ArrowDownIcon /> : <ArrowRightIcon />}
                 </button>
               </SpaceBetweenBox>
             </td>
```

각각 컴포넌트의 역할이 더 눈에 잘보이고, 코드의 가독성 또한 높아졌다!  
그리고 같은 기능을 하는 다른 컴포넌트에서 또 한번 함수 정의를 하지 않아도 되고 쓰고 싶을떄 마다 꺼내쓰기 가능
