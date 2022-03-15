import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import AuthReducer from './AuthReducer';
import { Action, InitialState } from './interface';

const INITIAL_STATE: InitialState = {
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext<InitialState>(INITIAL_STATE);
export const AuthDispatchContext = createContext<Dispatch<Action> | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
      }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
