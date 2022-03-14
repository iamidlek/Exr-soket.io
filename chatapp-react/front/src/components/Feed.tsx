import Post from './Post';
import Share from './Share';
import { Posts } from '../dummyData';
import styled from 'styled-components';

export default function Feed() {
  return (
    <Feeds>
      <FeedWrapper>
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </FeedWrapper>
    </Feeds>
  );
}

const Feeds = styled.div`
  flex: 5.5;
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;
