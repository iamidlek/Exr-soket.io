import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <TopbarContainer>
      <TopbarLeft>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>Nagisocial</Logo>
        </Link>
      </TopbarLeft>
      <TopbarCenter>
        <Searchbar>
          <SearchIcon />
          <SearchInput placeholder="Search for friend, post or video" />
        </Searchbar>
      </TopbarCenter>
      <TopbarRight>
        <div>
          <TopbarLink>Homepage</TopbarLink>
          <TopbarLink>Timeline</TopbarLink>
        </div>
        <TopbarIcons>
          <TopbarIconItem>
            <Person />
            <TopbarIconBadge>1</TopbarIconBadge>
          </TopbarIconItem>
          <Link to="/messenger">
            <TopbarIconItem>
              <Chat style={{ color: 'white' }} />
              <TopbarIconBadge>2</TopbarIconBadge>
            </TopbarIconItem>
          </Link>
          <TopbarIconItem>
            <Notifications />
            <TopbarIconBadge>1</TopbarIconBadge>
          </TopbarIconItem>
        </TopbarIcons>
        <Link to={`/profile/${user?.username}`}>
          <TopbarImg
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt="person"
          />
        </Link>
      </TopbarRight>
    </TopbarContainer>
  );
}

const TopbarContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const TopbarLeft = styled.div`
  flex: 3;
`;

const Logo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const TopbarCenter = styled.div`
  flex: 5;
`;

const Searchbar = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Search)`
  font-size: 20px !important;
  margin-left: 10px;
`;

const SearchInput = styled.input`
  border: none;
  width: 70%;
  &:focus {
    outline: none;
  }
`;

const TopbarRight = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;

const TopbarLink = styled.span`
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const TopbarIcons = styled.div`
  display: flex;
`;

const TopbarIconItem = styled.div`
  margin-right: 15px;
  cursor: pointer;
  position: relative;
`;

const TopbarIconBadge = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const TopbarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
