import { useContext, useEffect, useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import { format } from 'timeago.js';
import styled from 'styled-components';
import { Ipost, IUser } from '../context/interface';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Post({ post }: { post: Ipost }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<IUser>();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?._id) {
      setIsLiked(post.likes.includes(currentUser._id));
    }
  }, [currentUser?._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put('/api/posts/' + post._id + '/like', {
        userId: currentUser?._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <Posts>
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <Link to={`/profile/${user?.username}`}>
              <PostProfileImg
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
            </Link>
            <PostUsername>{user?.username}</PostUsername>
            <PostDate>{format(post?.createdAt)}</PostDate>
          </PostTopLeft>
          <div>
            <MoreVert />
          </div>
        </PostTop>
        <PostCenter>
          <span>{post?.desc}</span>
          <PostImg src={PF + post?.img} alt="" />
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
            <LikeIcon src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <LikeIcon src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <PostLikeCounter>{like} people like it</PostLikeCounter>
          </PostBottomLeft>
          <div>
            <PostCommentText>{post?.comment} comments</PostCommentText>
          </div>
        </PostBottom>
      </PostWrapper>
    </Posts>
  );
}

const Posts = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`;

const PostWrapper = styled.div`
  padding: 10px;
`;

const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const PostProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostUsername = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin: 0 10px;
`;

const PostDate = styled.span`
  font-size: 12px;
`;

const PostCenter = styled.div`
  margin: 20px 0;
`;

const PostImg = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostBottomLeft = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`;

const PostLikeCounter = styled.div`
  font-size: 15px;
`;

const PostCommentText = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed gray;
  font-size: 15px;
`;
