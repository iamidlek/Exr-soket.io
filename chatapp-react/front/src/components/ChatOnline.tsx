import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IUser } from 'src/context/interface';
import { Chat } from 'src/pages/Messenger';

export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentChat,
}: Iprops) {
  const [friends, setFriends] = useState<IUser[]>();
  const [onlineFriends, setOnlineFriends] = useState<IUser[]>();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const { data } = await axios.get('/api/users/friends/' + currentId);
      setFriends(data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends?.filter((f) => onlineUsers.includes(f._id as string)),
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user: IUser) => {
    try {
      const { data } = await axios.get(
        `/api/conversations/find/${currentId}/${user._id}`,
      );
      setCurrentChat(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {onlineFriends?.map((o) => (
        <ChatOnlineFriend key={o._id} onClick={() => handleClick(o)}>
          <ChatOnlineImgContainer>
            <ChatOnlineImg
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + 'person/noAvatar.png'
              }
              alt=""
            />
            <ChatOnlineBadge />
          </ChatOnlineImgContainer>
          <ChatOnlineName>{o?.username}</ChatOnlineName>
        </ChatOnlineFriend>
      ))}
    </div>
  );
}

interface Iprops {
  onlineUsers: string[];
  currentId: string;
  setCurrentChat: Dispatch<SetStateAction<Chat | undefined>>;
}

const ChatOnlineFriend = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
`;

const ChatOnlineImgContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;

const ChatOnlineImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
`;

const ChatOnlineBadge = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: 2px;
  right: 2px;
`;

const ChatOnlineName = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
