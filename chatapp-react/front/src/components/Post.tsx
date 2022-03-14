import { useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import { Users } from '../dummyData';
import styled from 'styled-components';

export default function Post({ post }: Iprops) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <Posts>
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <PostProfileImg
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <PostUsername>
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </PostUsername>
            <PostDate>{post.date}</PostDate>
          </PostTopLeft>
          <div>
            <MoreVert />
          </div>
        </PostTop>
        <PostCenter>
          <span>{post?.desc}</span>
          <PostImg src={post.photo} alt="" />
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
            <LikeIcon src="assets/like.png" onClick={likeHandler} alt="" />
            <LikeIcon src="assets/heart.png" onClick={likeHandler} alt="" />
            <PostLikeCounter>{like} people like it</PostLikeCounter>
          </PostBottomLeft>
          <div>
            <PostCommentText>{post.comment} comments</PostCommentText>
          </div>
        </PostBottom>
      </PostWrapper>
    </Posts>
  );
}

interface Iprops {
  post: {
    id: number;
    desc?: string;
    photo: string;
    date: string;
    userId: number;
    like: number;
    comment: number;
  };
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
