import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IUser } from 'src/context/interface';

export default function Conversation({ conversation, currentUser }: Iprops) {
  const [user, setUser] = useState<IUser>();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(
      (m: string) => m !== currentUser._id,
    );

    const getUser = async () => {
      try {
        const { data } = await axios('/api/users?userId=' + friendId);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <ConversationBox>
      <ConversationImg
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + 'person/noAvatar.png'
        }
        alt=""
      />
      <ConversationName>{user?.username}</ConversationName>
    </ConversationBox>
  );
}

interface Iprops {
  conversation: { members: string[] };
  currentUser: IUser;
}

const ConversationBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: rgb(245, 243, 243);
  }
`;

const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ConversationName = styled.span`
  font-weight: 500;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
