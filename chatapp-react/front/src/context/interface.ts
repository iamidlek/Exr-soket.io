export interface IUser {
  _id?: string;
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
  createdAt?: string;
  updateAt?: string;
}

export interface Ipost {
  _id?: string;
  userId: string;
  desc: string;
  comment: string;
  img: string;
  likes: string[];
  createdAt: string;
  updateAt: string;
}

export interface InitialState {
  user: IUser | null;
  isFetching: boolean;
  error: boolean | string;
}

export type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: IUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'FOLLOW'; payload: string }
  | { type: 'UNFOLLOW'; payload: string };
