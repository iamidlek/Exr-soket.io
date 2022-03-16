import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthDispatchContext } from '../context/AuthContext';
import { IUser } from '../context/interface';
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function ProfileRightbar({ user }: { user: IUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState<IUser[]>();
  const { user: currentUser } = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id as string),
  );

  const handleClick = async () => {
    try {
      if (dispatch) {
        if (followed) {
          await axios.put(`/users/${user._id}/unfollow`, {
            userId: currentUser?._id,
          });
          dispatch({ type: 'UNFOLLOW', payload: user._id as string });
        } else {
          await axios.put(`/users/${user._id}/follow`, {
            userId: currentUser?._id,
          });
          dispatch({ type: 'FOLLOW', payload: user._id as string });
        }
        setFollowed(!followed);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('/api/users/friends/' + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  return (
    <>
      {user.username !== currentUser?.username && (
        <RightbarFollowButton onClick={handleClick}>
          {followed ? 'Unfollow' : 'Follow'}
          {followed ? <Remove /> : <Add />}
        </RightbarFollowButton>
      )}
      <RightbarTitle>User information</RightbarTitle>
      <RightbarInfo>
        <RightbarInfoItem>
          <RightbarInfoKey>City:</RightbarInfoKey>
          <RightbarInfoValue>{user.city}</RightbarInfoValue>
        </RightbarInfoItem>
        <RightbarInfoItem>
          <RightbarInfoKey>From:</RightbarInfoKey>
          <RightbarInfoValue>{user.from}</RightbarInfoValue>
        </RightbarInfoItem>
        <RightbarInfoItem>
          <RightbarInfoKey>Relationship:</RightbarInfoKey>
          <RightbarInfoValue>
            {1 === user.relationship
              ? 'Single'
              : 1 === user.relationship
              ? 'Married'
              : '-'}
          </RightbarInfoValue>
        </RightbarInfoItem>
      </RightbarInfo>
      <RightbarTitle>User friends</RightbarTitle>
      <RightbarFollowings>
        {friends?.map((friend) => (
          <Link
            key={friend._id}
            to={'/profile/' + friend.username}
            style={{ textDecoration: 'none' }}>
            <RightbarFollowing>
              <RightbarFollowingImg
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
              <span>{friend.username}</span>
            </RightbarFollowing>
          </Link>
        ))}
      </RightbarFollowings>
    </>
  );
}

const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const RightbarInfo = styled.div`
  margin-bottom: 30px;
`;

const RightbarInfoItem = styled.div`
  margin-bottom: 10px;
`;

const RightbarInfoKey = styled.span`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
`;

const RightbarInfoValue = styled.span`
  font-weight: 300;
`;

const RightbarFollowings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RightbarFollowing = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
`;

const RightbarFollowingImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const RightbarFollowButton = styled.button`
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  background-color: #1872f2;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
