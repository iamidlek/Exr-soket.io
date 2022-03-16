import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Register() {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordAgain = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passwordAgain.current &&
      password.current &&
      username.current &&
      email.current
    ) {
      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity('Passwords don`t match!');
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        try {
          await axios.post('/api/auth/register', user);
          navigate('/login');
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/login');
  };
  return (
    <Login>
      <LoginWrapper>
        <LoginSep>
          <LoginLogo>Nagisocial</LoginLogo>
          <LoginDesc>
            Connect with friends and the world around you on Nagisocial.
          </LoginDesc>
        </LoginSep>
        <LoginSep>
          <InputBox onSubmit={handleSubmit}>
            <LoginInput placeholder="Username" required ref={username} />
            <LoginInput placeholder="Email" required ref={email} type="email" />
            <LoginInput
              placeholder="Password"
              required
              ref={password}
              type="password"
              minLength={6}
            />
            <LoginInput
              placeholder="Password Again"
              required
              type="password"
              ref={passwordAgain}
            />
            <LoginButton>Sign Up</LoginButton>
            <LoginRegisterButton onClick={handleClick}>
              Log into Account
            </LoginRegisterButton>
          </InputBox>
        </LoginSep>
      </LoginWrapper>
    </Login>
  );
}

const Login = styled.div`
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

const LoginLogo = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: #1775ee;
  margin-bottom: 10px;
`;

const LoginDesc = styled.span`
  font-size: 24px;
`;

const LoginSep = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputBox = styled.form`
  height: 400px;
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
