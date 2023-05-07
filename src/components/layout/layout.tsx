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
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;

import styled from '@emotion/styled';
import SideBar from './side-bar';

export const Container = styled(FlexColumnBox)`
  position: relative;
`;

export const ContentWrapper = styled(FlexColumnBox)`
  position: absolute;
  margin-left: 200px;
  margin-top: 70px;
  background-color: lightblue;
  width: 100vw;
`;
