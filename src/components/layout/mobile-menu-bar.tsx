interface P {
  focusedCategory: string;
  handleMenuClick: (category: string) => void;
}

const MobileMenuBar = ({ focusedCategory, handleMenuClick }: P) => {
  return (
    <Container>
      <MenuItem
        href={`/posts`}
        focused={focusedCategory === 'All'}
        onClick={() => handleMenuClick('All')}
      >
        All
      </MenuItem>
      {CATEGORIES.map((category) => (
        <MenuItem
          key={category}
          href={`/posts?category=${category}`}
          focused={focusedCategory === category}
          onClick={() => handleMenuClick(category)}
        >
          {category}
        </MenuItem>
      ))}
    </Container>
  );
};

export default MobileMenuBar;

import styled from '@emotion/styled';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { getFocusedCategoryState } from 'src/atoms/focusedCategory';
import { CATEGORIES } from 'src/constants/categories';
import { FlexBox } from 'src/styles/common';
import { isEmptyString } from 'src/utils/common';

export const Container = styled(FlexBox)`
  width: 100%;
  overflow-x: scroll;
  margin-top: 70px;
  gap: 8px;
  position: fixed;
  background-color: white;
  z-index: 40;
  padding: 12px 24px;
`;

export const MenuItem = styled(Link)<{ focused?: boolean }>`
  text-decoration: none;
  background-color: ${({ focused }) =>
    focused ? 'var(--blue100)' : 'var(--grey100)'};
  color: black;
  font-weight: 500;
  display: flex;
  box-sizing: border-box;
  padding: 6px 12px;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  border-radius: 12px;

  /* :hover {
    background-color: #f5f5f5;
    transition: all 0.4s;
  } */
`;
