import styled from 'styled-components';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Profile() {
  return (
    <>
      <Topbar />
      <ProfileBox>
        <Sidebar />
        <div>
          <ProfileRightTop>
            <ProfileCover>
              <ProfileCoverImg src="assets/post/3.jpeg" alt="" />
              <ProfileUserImg src="assets/person/7.jpeg" alt="" />
            </ProfileCover>
            <ProfileInfo>
              <ProfileInfoName>Safak Kocaoglu</ProfileInfoName>
              <ProfileInfoDesc>Hello my friends!</ProfileInfoDesc>
            </ProfileInfo>
          </ProfileRightTop>
          <ProfileRightBottom>
            <Feed />
            <Rightbar profile />
          </ProfileRightBottom>
        </div>
      </ProfileBox>
    </>
  );
}

const ProfileBox = styled.div`
  display: flex;
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
