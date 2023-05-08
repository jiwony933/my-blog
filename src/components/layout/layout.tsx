import { FlexColumnBox } from 'src/styles/common';
import TopNav from './top-nav';

interface P {
  children: JSX.Element;
}

const Layout = ({ children }: P) => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <TopNav />
      {isMobile ? <MobileMenuBar /> : <SideBar />}
      <ContentWrapper isMobile={isMobile}>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;

import styled from '@emotion/styled';
import SideBar from './pc-side-bar';
import MobileMenuBar from './mobile-menu-bar';
import { useIsMobile } from 'src/hooks/useIsMobile';

export const Container = styled(FlexColumnBox)<{ isMobile?: boolean }>`
  max-width: ${({ isMobile }) => (isMobile ? '100%' : `var(--MAX_WIDTH)`)};
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
    isMobile ? '70px 50px 100px 50px' : '30px 50px 100px 240px'};
  width: 100%;
  /* min-width: ${({ isMobile }) => (isMobile ? '500px' : `var(--MIN_WIDTH)`)};
  max-width: ${({ isMobile }) => (isMobile ? '700px' : `var(--MAX_WIDTH)`)}; */
  margin-top: 70px;
`;
