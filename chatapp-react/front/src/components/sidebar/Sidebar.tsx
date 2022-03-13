import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from '@material-ui/icons';
import styled from 'styled-components';
import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
  return (
    <SidebarCT>
      <SidebarWrapper>
        <SidebarList>
          <SidebarListItem>
            <SidebarIcon>
              <RssFeed />
            </SidebarIcon>
            <span>Feed</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Chat />
            </SidebarIcon>
            <span>Chats</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <PlayCircleFilledOutlined />
            </SidebarIcon>
            <span>Videos</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Group />
            </SidebarIcon>
            <span>Groups</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Bookmark />
            </SidebarIcon>
            <span>Bookmarks</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <HelpOutline />
            </SidebarIcon>
            <span>Questions</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <WorkOutline />
            </SidebarIcon>
            <span>Jobs</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Event />
            </SidebarIcon>
            <span>Events</span>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <School />
            </SidebarIcon>
            <span>Courses</span>
          </SidebarListItem>
        </SidebarList>
        <SidebarButton>Show More</SidebarButton>
        <SidebarHr />
        <SidebarFriendList>
          {Users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </SidebarFriendList>
      </SidebarWrapper>
    </SidebarCT>
  );
}

const SidebarCT = styled.div`
  flex: 3;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  position: sticky;
  top: 50px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;

const SidebarWrapper = styled.div`
  padding: 20px;
`;

const SidebarList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const SidebarListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SidebarIcon = styled.span`
  margin-right: 15px;
`;

const SidebarButton = styled.button`
  width: 150px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
`;

const SidebarHr = styled.hr`
  margin: 20px 0;
`;

const SidebarFriendList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
