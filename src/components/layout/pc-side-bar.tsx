interface P {}

const SideBar = ({}: P) => {
  return (
    <Container>
      <MenuGroup href={`/about`}>About</MenuGroup>
      <MenuGroup href={`/posts`}>Posts</MenuGroup>
      <MenuItem href={`/posts?category=client`}>{'> '}Client</MenuItem>
      <MenuItem href={`/posts?category=client`}>{'> '}Server</MenuItem>
      <MenuItem href={`/posts?category=client`}>{'> '}Data Base</MenuItem>
      <MenuItem href={`/posts?category=client`}>{'> '}Algorithm</MenuItem>
      <MenuItem href={`/posts?category=client`}>{'> '}Memoir</MenuItem>
      <MenuItem href={`/posts?category=client`}>{'> '}and others ...</MenuItem>
    </Container>
  );
};

export default SideBar;

import styled from '@emotion/styled';
import Link from 'next/link';
import { FlexColumnBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)`
  width: 200px;
  padding-top: 70px;
  height: 100vh;
  gap: 4px;
  position: fixed;
  background-color: white;
  z-index: 40;
`;

export const MenuGroup = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 6px;
  cursor: pointer;
  width: 100%;

  :hover {
    background-color: var(--blue50);
    transition: all 0.3s;
  }
`;

export const MenuItem = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  box-sizing: border-box;
  padding: 6px 12px;
  cursor: pointer;
  background-color: white;
  white-space: nowrap;
  width: 100%;

  :hover {
    background-color: #f5f5f5;
    transition: all 0.4s;
  }
`;
