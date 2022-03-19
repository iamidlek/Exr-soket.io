import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import Topbar from '../components/Topbar';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import ChatOnline from '../components/ChatOnline';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

const socket = io('ws://localhost:8900').connect();

export interface Chat {
  _id: string;
  members: string[];
}

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<Chat>();
  const [messages, setMessages] = useState<ArrivalMessage[]>();
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...(prev as ArrivalMessage[]), arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit('addUser', user?._id);
    socket.on('getUsers', (users: { userId: string }[]) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users.some((u) => u.userId === f)),
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/conversations/' + user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get('/api/messages/' + currentChat?._id);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id,
    );

    socket.emit('sendMessage', {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const { data } = await axios.post('/api/messages', message);
      setMessages([...(messages as ArrivalMessage[]), data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Topbar />
      <MessengerBox>
        <ChatMenu>
          <ChatMenuWrapper>
            <ChatMenuInput placeholder="Search for friends" />
            {conversations.map((c) => (
              <div key={c} onClick={() => setCurrentChat(c)}>
                {user && <Conversation conversation={c} currentUser={user} />}
              </div>
            ))}
          </ChatMenuWrapper>
        </ChatMenu>
        <ChatBox>
          <ChatBoxWrapper>
            {currentChat ? (
              <>
                <ChatBoxTop>
                  {messages &&
                    messages.map((m) => (
                      <div ref={scrollRef} key={m.sender}>
                        <Message message={m} own={m.sender === user?._id} />
                      </div>
                    ))}
                </ChatBoxTop>
                <ChatBoxBottom>
                  <ChatMessageInput
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <ChatSubmitButton onClick={handleSubmit}>
                    Send
                  </ChatSubmitButton>
                </ChatBoxBottom>
              </>
            ) : (
              <NoConversationText>
                Open a conversation to start a chat.
              </NoConversationText>
            )}
          </ChatBoxWrapper>
        </ChatBox>
        <ChatOnlineBox>
          <ChatOnlineWrapper>
            {onlineUsers && user?._id && (
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            )}
          </ChatOnlineWrapper>
        </ChatOnlineBox>
      </MessengerBox>
    </>
  );
}

export interface ArrivalMessage {
  sender: string;
  text: string;
  createdAt: number;
}

const MessengerBox = styled.div`
  height: calc(100vh - 70px);
  display: flex;
`;

const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const ChatMenu = styled.div`
  flex: 3.5;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;
const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ChatBox = styled.div`
  flex: 5.5;
  @media screen and (max-width: 768px) {
    flex: 10;
  }
`;
const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  height: 100%;
`;
const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;

const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
`;

const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;

const ChatOnlineBox = styled.div`
  flex: 3;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;

const ChatOnlineWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
`;
