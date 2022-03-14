import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import styled from 'styled-components';

export default function Share() {
  return (
    <ShareBox>
      <ShareWrapper>
        <ShareTop>
          <ShareProfileImg src="/assets/person/1.jpeg" alt="" />
          <ShareInput placeholder="What's in your mind Safak?" />
        </ShareTop>
        <ShareHr />
        <ShareBottom>
          <ShareOptions>
            <ShareOption>
              <ShareIcon>
                <PermMedia htmlColor="tomato" />
              </ShareIcon>
              <ShareOptionText>Photo or Video</ShareOptionText>
            </ShareOption>
            <ShareOption>
              <ShareIcon>
                <Label htmlColor="blue" />
              </ShareIcon>
              <ShareOptionText>Tag</ShareOptionText>
            </ShareOption>
            <ShareOption>
              <ShareIcon>
                <Room htmlColor="green" />
              </ShareIcon>
              <ShareOptionText>Location</ShareOptionText>
            </ShareOption>
            <ShareOption>
              <ShareIcon>
                <EmojiEmotions htmlColor="goldenrod" />
              </ShareIcon>
              <ShareOptionText>Feelings</ShareOptionText>
            </ShareOption>
          </ShareOptions>
          <ShareButton>Share</ShareButton>
        </ShareBottom>
      </ShareWrapper>
    </ShareBox>
  );
}

const ShareBox = styled.div`
  width: 100%;
  height: 170px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;

const ShareWrapper = styled.div`
  padding: 10px;
`;

const ShareTop = styled.div`
  display: flex;
  align-items: center;
`;

const ShareProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ShareInput = styled.input`
  border: none;
  width: 80%;
  &:focus {
    outline: none;
  }
`;
const ShareHr = styled.hr`
  margin: 20px;
`;
const ShareBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ShareOptions = styled.div`
  display: flex;
  margin-left: 20px;
`;
const ShareOption = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;

const ShareIcon = styled.span`
  font-size: 18px;
  margin-right: 3px;
`;
const ShareOptionText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
const ShareButton = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  color: white;
`;
