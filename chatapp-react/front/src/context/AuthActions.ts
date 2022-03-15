import { IUser } from './interface';

export const LoginStart = () => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (user: IUser) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const LoginFailure = (err: string) => ({
  type: 'LOGIN_FAILURE',
  payload: err,
});

export const Follow = (userId: string) => ({
  type: 'FOLLOW',
  payload: userId,
});

export const Unfollow = (userId: string) => ({
  type: 'UNFOLLOW',
  payload: userId,
});
