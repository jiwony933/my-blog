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
  width: 100%;
  max-width: var(--MAX_WIDTH);
  position: relative;
  min-height: -webkit-fill-available;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
  background: white;
  margin: 0 auto;
  position: fixed;
  overflow-y: scroll;
`;

export const ContentWrapper = styled(FlexColumnBox)`
  position: absolute;
  padding: 50px 50px 100px 240px;
  width: 100%;
  max-width: var(--MAX_WIDTH);
  margin-top: 70px;
`;
