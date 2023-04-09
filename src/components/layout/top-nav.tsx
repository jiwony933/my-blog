import { FlexBox, FlexColumnBox } from 'src/styles/common';
import Logo from './logo';
import SideBar from './side-bar';
import Image from 'next/image';

interface P {}

const TopNav = ({}: P) => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default TopNav;

import styled from '@emotion/styled';

export const Container = styled(FlexBox)`
  position: fixed;
  z-index: 100;
  background-color: white;
  padding: 12px;
`;
