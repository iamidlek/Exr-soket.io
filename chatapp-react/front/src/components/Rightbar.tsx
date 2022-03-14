import styled from 'styled-components';
import HomeRightbar from './HomeRightbar';
import ProfileRightbar from './ProfileRightbar';

export default function Rightbar({ profile = false }) {
  return (
    <Rbar>
      <RbarWrapper>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
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
