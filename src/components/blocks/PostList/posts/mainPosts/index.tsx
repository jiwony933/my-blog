import { SpaceBetweenBox } from 'src/styles/common';
import MainPostCard from './mainPostCard';
import {
  Container,
  PostsWrapper,
  Title,
  TitleWrapper,
  ToggleButton,
} from './styles';
import { useState } from 'react';
import ArrowUpIcon from 'src/assets/icons/ArrowUpIcon';
import ArrowDownIcon from 'src/assets/icons/ArrowDownIcon';

interface P {
  mainPosts: PostSummary[];
  isMobile: boolean;
}

const MainPosts = ({ mainPosts, isMobile }: P) => {
  const [isPinnedOpen, setIsPinnedOpen] = useState(true);
  return (
    <Container>
      <TitleWrapper>
        <Title>📌 Pinned</Title>
        <ToggleButton onClick={() => setIsPinnedOpen(!isPinnedOpen)}>
          {isPinnedOpen ? (
            <ArrowUpIcon width={18} height={18} />
          ) : (
            <ArrowDownIcon width={16} height={16} />
          )}
        </ToggleButton>
      </TitleWrapper>
      {isPinnedOpen && (
        <PostsWrapper isMobile={isMobile}>
          {mainPosts.map((post) => (
            <MainPostCard key={post.id} post={post} isMobile={isMobile} />
          ))}
        </PostsWrapper>
      )}
    </Container>
  );
};

export default MainPosts;
