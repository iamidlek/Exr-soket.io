import styled from 'styled-components';

export default function ProfileRightbar() {
  return (
    <>
      <RightbarTitle>User information</RightbarTitle>
      <RightbarInfo>
        <RightbarInfoItem>
          <RightbarInfoKey>City:</RightbarInfoKey>
          <RightbarInfoValue>New York</RightbarInfoValue>
        </RightbarInfoItem>
        <RightbarInfoItem>
          <RightbarInfoKey>From:</RightbarInfoKey>
          <RightbarInfoValue>Madrid</RightbarInfoValue>
        </RightbarInfoItem>
        <RightbarInfoItem>
          <RightbarInfoKey>Relationship:</RightbarInfoKey>
          <RightbarInfoValue>Single</RightbarInfoValue>
        </RightbarInfoItem>
      </RightbarInfo>
      <RightbarTitle>User friends</RightbarTitle>
      <RightbarFollowings>
        <RightbarFollowing>
          <RightbarFollowingImg src="assets/person/1.jpeg" alt="" />
          <span>John Carter</span>
        </RightbarFollowing>
        <RightbarFollowing>
          <RightbarFollowingImg src="assets/person/2.jpeg" alt="" />
          <span>John Carter</span>
        </RightbarFollowing>
        <RightbarFollowing>
          <RightbarFollowingImg src="assets/person/3.jpeg" alt="" />
          <span>John Carter</span>
        </RightbarFollowing>
        <RightbarFollowing>
          <RightbarFollowingImg src="assets/person/4.jpeg" alt="" />
          <span>John Carter</span>
        </RightbarFollowing>
        <RightbarFollowing>
          <RightbarFollowingImg src="assets/person/5.jpeg" alt="" />
          <span>John Carter</span>
        </RightbarFollowing>
        <RightbarFollowing>
          <RightbarFollowingImg src="assets/person/6.jpeg" alt="" />
          <span>John Carter</span>
        </RightbarFollowing>
      </RightbarFollowings>
    </>
  );
}

const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const RightbarInfo = styled.div`
  margin-bottom: 30px;
`;

const RightbarInfoItem = styled.div`
  margin-bottom: 10px;
`;

const RightbarInfoKey = styled.span`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
`;

const RightbarInfoValue = styled.span`
  font-weight: 300;
`;

const RightbarFollowings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RightbarFollowing = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
`;

const RightbarFollowingImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;
