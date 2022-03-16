import Post from './Post';
import Share from './Share';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Ipost } from 'src/context/interface';

export default function Feed({ username }: { username?: string }) {
  const [posts, setPosts] = useState<Ipost[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = username
        ? await axios.get('/api/posts/profile/' + username)
        : await axios.get('/api/posts/timeline/' + user?._id);
      setPosts(
        (data as Ipost[]).sort((p1, p2) => {
          if (p2.createdAt && p1.createdAt) {
            const a = new Date(p1.createdAt);
            const b = new Date(p2.createdAt);
            return a > b ? -1 : a < b ? 1 : 0;
          }
          return 0;
        }),
      );
    };
    fetchPosts();
  }, [username, user?._id]);
  return (
    <Feeds>
      <FeedWrapper>
        {(!username || username === user?.username) && <Share />}
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
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
