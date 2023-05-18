interface P {
  focusedCategory?: string;
}

const SideBar = ({ focusedCategory }: P) => {
  return (
    <Container>
      <MenuGroup href={`/posts`} focused={isEmptyString(focusedCategory)}>
        Posts
      </MenuGroup>
      {CATEGORIES.map((category) => (
        <MenuItem
          key={category}
          href={`/posts?category=${category}`}
          focused={focusedCategory === category}
        >
          {'> '}
          {category}
        </MenuItem>
      ))}
    </Container>
  );
};

export default SideBar;

import styled from '@emotion/styled';
import Link from 'next/link';
import { CATEGORIES } from 'src/constants/categories';
import { FlexColumnBox } from 'src/styles/common';
import { isEmptyString } from 'src/utils/common';

export const Container = styled(FlexColumnBox)`
  width: 200px;
  padding-top: 70px;
  height: 100vh;
  gap: 4px;
  position: fixed;
  background-color: white;
  z-index: 40;
`;

export const MenuGroup = styled(Link)<{ focused?: boolean }>`
  text-decoration: none;
  color: black;
  padding: 6px;
  cursor: pointer;
  background-color: ${({ focused }) => (focused ? 'var(--blue100)' : 'white')};
  width: 100%;

  :hover {
    background-color: var(--blue50);
    transition: all 0.3s;
  }
`;

export const MenuItem = styled(MenuGroup)`
  text-decoration: none;
  color: black;
  display: flex;
  box-sizing: border-box;
  padding: 6px 12px;
  cursor: pointer;

  white-space: nowrap;
  width: 100%;

  :hover {
    background-color: #f5f5f5;
    transition: all 0.4s;
  }
`;
