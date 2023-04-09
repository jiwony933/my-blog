import { FlexColumnBox } from 'src/styles/common';
import TopNav from './top-nav';

interface P {
  children: JSX.Element;
}

const Layout = ({ children }: P) => {
  return (
    <Container>
      <TopNav />
      <SideBar />
      {children}
    </Container>
  );
};

export default Layout;

import styled from '@emotion/styled';
import SideBar from './side-bar';

export const Container = styled(FlexColumnBox)``;
