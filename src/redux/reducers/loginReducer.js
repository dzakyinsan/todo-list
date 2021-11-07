import { USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./../actions/types";

const INITIAL_STATE = {
  message: "",
  login: false,
  dataUser: {},
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, login: true, dataUser: action.payload };
    case USER_LOGIN_FAILED:
      return { ...state, message: action.payload };
    case USER_LOGOUT:
      return { ...state, login: false };
    default:
      return state;
  }
};
export default loginReducer;
