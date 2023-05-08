import { FlexColumnBox } from 'src/styles/common';
import TopNav from './top-nav';

interface P {
  children: JSX.Element;
}

const Layout = ({ children }: P) => {
  const isPcOrTablet = useMediaQuery({ minDeviceWidth: 768 });
  const isMobile = useMediaQuery({ maxDeviceWidth: 767 });

  return (
    <Container>
      <TopNav />
      {isPcOrTablet && <SideBar />}
      {isMobile && <MobileMenuBar />}
      <ContentWrapper isMobile={isMobile}>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;

import styled from '@emotion/styled';
import SideBar from './pc-side-bar';
import { useMediaQuery } from 'react-responsive';
import MobileMenuBar from './mobile-menu-bar';

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
  margin: 0 auto;
  left: 0;
  right: 0;
  overflow-y: scroll;
`;

export const ContentWrapper = styled(FlexColumnBox)<{ isMobile?: boolean }>`
  position: absolute;
  padding: ${({ isMobile }) =>
    isMobile ? '30px 50px 100px 50px' : '30px 50px 100px 240px'};
  width: 100%;
  max-width: var(--MAX_WIDTH);
  margin-top: 70px;
`;
