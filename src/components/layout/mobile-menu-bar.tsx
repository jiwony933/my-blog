interface P {}

const MobileMenuBar = ({}: P) => {
  return (
    <Container>
      <MenuItem href={`/posts`}>All</MenuItem>
      <MenuItem href={`/posts?category=client`}>Client</MenuItem>
      <MenuItem href={`/posts?category=client`}>Server</MenuItem>
      <MenuItem href={`/posts?category=client`}>Data Base</MenuItem>
      <MenuItem href={`/posts?category=client`}>Algorithm</MenuItem>
      <MenuItem href={`/posts?category=client`}>Memoir</MenuItem>
      <MenuItem href={`/posts?category=client`}>and others ...</MenuItem>
    </Container>
  );
};

export default MobileMenuBar;

import styled from '@emotion/styled';
import Link from 'next/link';
import { FlexBox } from 'src/styles/common';

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

export const MenuItem = styled(Link)`
  text-decoration: none;
  background-color: var(--grey100);
  color: black;
  font-weight: 500;
  display: flex;
  box-sizing: border-box;
  padding: 6px 12px;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  border-radius: 12px;

  :hover {
    background-color: #f5f5f5;
    transition: all 0.4s;
  }
`;
