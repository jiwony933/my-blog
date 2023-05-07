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
  /* min-height: calc(var(--vh, 1vh) * 100); */
  background: white;
  margin: 0 auto;
`;

export const ContentWrapper = styled(FlexColumnBox)`
  position: absolute;
  padding-left: 240px;
  width: 100%;
  max-width: var(--MAX_WIDTH);
  /* background-color: blue; */
  margin-top: 70px;
  /* width: auto; */
`;
