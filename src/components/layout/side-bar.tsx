interface P {}

const SideBar = ({}: P) => {
  return (
    <Container>
      <MenuGroup>About</MenuGroup>
      <MenuGroup>Posts</MenuGroup>
      <MenuItem>{'> '}Client</MenuItem>
      <MenuItem>{'> '}Server</MenuItem>
      <MenuItem>{'> '}Data Base</MenuItem>
      <MenuItem>{'> '}Algorithm</MenuItem>
      <MenuItem>{'> '}Memoir</MenuItem>
      <MenuItem>{'> '}and others ...</MenuItem>
    </Container>
  );
};

export default SideBar;

import styled from '@emotion/styled';
import { FlexBox, FlexColumnBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)`
  width: 20%;
  padding-top: 70px;
  height: 100vh;
  gap: 4px;
  position: sticky;
`;

export const MenuGroup = styled(FlexBox)`
  padding: 6px;
`;

export const MenuItem = styled(FlexBox)`
  box-sizing: border-box;
  padding: 6px 12px;
  cursor: pointer;
  background-color: white;

  :hover {
    background-color: #f5f5f5;
    transition: all 0.4s;
  }
`;
