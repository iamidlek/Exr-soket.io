import { IUser } from 'src/context/interface';
import styled from 'styled-components';

export default function Online({ user }: { user: IUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <RbarFriend>
      <RbarProfileImgContainer>
        <RbarProfileImg src={PF && PF + user?.profilePicture} alt="" />
        <RbarOnline />
      </RbarProfileImgContainer>
      <RbarUsername>{user.username}</RbarUsername>
    </RbarFriend>
  );
}

const RbarFriend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const RbarProfileImgContainer = styled.div`
  margin-right: 10px;
  position: relative;
`;

const RbarProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const RbarOnline = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: -2px;
  right: 0;
  border: 2px solid white;
`;

const RbarUsername = styled.span`
  font-weight: 500;
`;
