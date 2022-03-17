import React, { useContext, useRef, useState } from 'react';
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@material-ui/icons';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>();

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const newPost = {
        userId: user?._id,
        desc: desc?.current?.value,
        img: '',
      };
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      try {
        await axios.post('/api/upload', data);
      } catch (err) {
        console.log(err);
      }
      try {
        await axios.post('/api/posts', newPost);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <ShareBox>
      <ShareWrapper>
        <ShareTop>
          <ShareProfileImg
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt=""
          />
          <ShareInput
            ref={desc}
            placeholder={'What`s in your mind ' + user?.username + '?'}
          />
        </ShareTop>
        <ShareHr />
        {file && (
          <ShareImgContainer>
            <ShareImg src={URL.createObjectURL(file as File)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </ShareImgContainer>
        )}
        <ShareBottom onSubmit={submitHandler}>
          <ShareOptions>
            <ShareOption as="label" htmlFor="file">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <ShareOptionText>Photo or Video</ShareOptionText>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleSetFile}
              />
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
          <ShareButton type="submit">Share</ShareButton>
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

const ShareBottom = styled.form`
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

const ShareImgContainer = styled.div`
  padding: 0 20px 10px 20px;
  position: relative;
`;

const ShareImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
