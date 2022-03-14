import styled from 'styled-components';

export default function CloseFriend({ user }: Iprops) {
  return (
    <SidebarFriend>
      <SidebarFriendImg src={user.profilePicture} alt="profilePicture" />
      <span>{user.username}</span>
    </SidebarFriend>
  );
}

interface Iprops {
  user: {
    id: number;
    profilePicture: string;
    username: string;
  };
}

const SidebarFriend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SidebarFriendImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
