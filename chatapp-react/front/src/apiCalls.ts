import axios from 'axios';
import { Dispatch } from 'react';
import { Action } from './context/interface';

interface IuserCredential {
  email: string;
  password: string;
}

export const loginCall = async (
  userCredential: IuserCredential,
  dispatch: Dispatch<Action> | null,
) => {
  if (dispatch) {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data } = await axios.post('/api/auth/login', userCredential);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err as string });
    }
  }
};
