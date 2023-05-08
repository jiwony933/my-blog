import { FlexBox } from 'src/styles/common';
import Logo from './logo';

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
  width: 100%;
  height: 70px;
  max-width: var(--MAX_WIDTH);
`;
