import React, { useContext, useEffect, useRef } from 'react';
import { loginCall } from '../apiCalls';
import styled from 'styled-components';
import { AuthContext, AuthDispatchContext } from '../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const { user, isFetching } = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.current && password.current) {
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch,
      );
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/register');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  return (
    <Logins>
      <LoginWrapper>
        <LoginSep>
          <LoginLogo>Nagisocial</LoginLogo>
          <LoginDesc>
            Connect with friends and the world around you on Nagisocial.
          </LoginDesc>
        </LoginSep>
        <LoginSep>
          <LoginBox onSubmit={handleSubmit}>
            <LoginInput placeholder="Email" required ref={email} type="email" />
            <LoginInput
              placeholder="Password"
              required
              ref={password}
              type="password"
            />
            <LoginButton type="submit">
              {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                'Log In'
              )}
            </LoginButton>
            <LoginRegisterButton onClick={handleClick}>
              {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                'Create a New Account'
              )}
            </LoginRegisterButton>
          </LoginBox>
        </LoginSep>
      </LoginWrapper>
    </Logins>
  );
}

const Logins = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginWrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
`;
const LoginSep = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginLogo = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: #1775ee;
  margin-bottom: 10px;
`;
const LoginDesc = styled.span`
  font-size: 24px;
`;
const LoginBox = styled.form`
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginInput = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;
const LoginButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #1775ee;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const LoginRegisterButton = styled.button`
  width: 60%;
  align-self: center;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #42b72a;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;
