import { InitialState, Action } from './interface';

const AuthReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'FOLLOW':
      if (state.user?.followings) {
        return {
          ...state,
          user: {
            ...state.user,
            followings: [...state.user.followings, action.payload],
          },
        };
      }
      return state;
    case 'UNFOLLOW':
      if (state.user?.followings) {
        return {
          ...state,
          user: {
            ...state.user,
            followings: state.user.followings.filter(
              (following) => following !== action.payload,
            ),
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default AuthReducer;
