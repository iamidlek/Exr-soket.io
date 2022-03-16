import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IUser } from '../context/interface';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState<IUser>();
  const { username } = useParams();

  const fetchUser = async () => {
    const { data } = await axios.get(`/api/users?username=${username}`);
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <ProfileBox>
        <Sidebar />
        <ProfileRight>
          <ProfileRightTop>
            <ProfileCover>
              <ProfileCoverImg
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : PF + 'person/noCover.png'
                }
                alt=""
              />
              <ProfileUserImg
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
            </ProfileCover>
            <ProfileInfo>
              <ProfileInfoName>{user?.username}</ProfileInfoName>
              <ProfileInfoDesc>{user?.desc}</ProfileInfoDesc>
            </ProfileInfo>
          </ProfileRightTop>
          <ProfileRightBottom>
            <Feed username={username} />
            {user && <Rightbar user={user} />}
          </ProfileRightBottom>
        </ProfileRight>
      </ProfileBox>
    </>
  );
}

const ProfileBox = styled.div`
  display: flex;
`;

const ProfileRight = styled.div`
  flex: 9;
`;

const ProfileRightTop = styled.div`
  flex: 9;
`;

const ProfileCover = styled.div`
  height: 320px;
  position: relative;
`;

const ProfileCoverImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ProfileUserImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150px;
  border: 3px solid white;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileInfoName = styled.h4`
  font-size: 24px;
`;

const ProfileInfoDesc = styled.span`
  font-weight: 300;
`;

const ProfileRightBottom = styled.div`
  display: flex;
`;
