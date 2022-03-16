import { IUser } from 'src/context/interface';
import styled from 'styled-components';
import HomeRightbar from './HomeRightbar';
import ProfileRightbar from './ProfileRightbar';

export default function Rightbar({
  profile = false,
  user,
}: {
  profile?: boolean;
  user?: IUser;
}) {
  return (
    <Rbar>
      <RbarWrapper>
        {user && profile ? <ProfileRightbar user={user} /> : <HomeRightbar />}
      </RbarWrapper>
    </Rbar>
  );
}

const Rbar = styled.div`
  flex: 3.5;
`;

const RbarWrapper = styled.div`
  padding: 20px 20px 0 0;
`;
