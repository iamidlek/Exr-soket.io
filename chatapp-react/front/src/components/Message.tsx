import { ArrivalMessage } from '../pages/Messenger';
import { format } from 'timeago.js';
import styled from 'styled-components';

export default function Message({ message, own }: Iprops) {
  return (
    <MessageBox own={own}>
      <MessageTop>
        <MessageImg
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <MessageText own={own}>{message.text}</MessageText>
      </MessageTop>
      <MessageBottom>{format(message.createdAt)}</MessageBottom>
    </MessageBox>
  );
}

interface Iprops {
  message: ArrivalMessage;
  own: boolean;
}

const MessageBox = styled.div<{ own: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  ${({ own }) => (own ? 'align-items: flex-end;' : 'align-items: stretch;')};
`;

const MessageTop = styled.div`
  display: flex;
`;

const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const MessageText = styled.p<{ own: boolean }>`
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ own }) => (own ? 'rgb(245, 241, 241)' : '#1877f2')};
  color: ${({ own }) => (own ? 'black' : 'white')};
  max-width: 300px;
`;

const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;
