export interface IUser {
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: string[];
  followings?: string[];
  isAdmin?: boolean;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: number;
}

export interface InitialState {
  user: IUser | null;
  isFetching: boolean;
  error: boolean;
}

export type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: IUser }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'FOLLOW'; payload: string }
  | { type: 'UNFOLLOW'; payload: string };
