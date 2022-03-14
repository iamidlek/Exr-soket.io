import styled from 'styled-components';
import { Users } from '../dummyData';
import Online from './Online';

export default function HomeRightbar() {
  return (
    <>
      <BirthdayContainer>
        <BirthdayImg src="assets/gift.png" alt="" />
        <BirthdayText>
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </BirthdayText>
      </BirthdayContainer>
      <RightbarAd src="assets/ad.png" alt="" />
      <RightbarTitle>Online Friends</RightbarTitle>
      <RightbarFriendList>
        {Users.map((user) => (
          <Online key={user.id} user={user} />
        ))}
      </RightbarFriendList>
    </>
  );
}

const BirthdayContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BirthdayImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const BirthdayText = styled.span`
  font-weight: 300;
  font-size: 15px;
`;

const RightbarAd = styled.img`
  width: 100%;
  border-radius: 10px;
  margin: 30px 0;
`;

const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const RightbarFriendList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
