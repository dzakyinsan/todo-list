import { USER_REGISTER_FAILED, USER_REGISTER_SUCCESS, USER_LOGOUT } from "./../actions/types";

const INITIAL_STATE = {
  token: "",
  message: "",
  register: false,
};

const registerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { ...state, register: true };
    case USER_REGISTER_FAILED:
      return { ...state, message: action.payload };
    case USER_LOGOUT:
      return { ...state, register: false };
    default:
      return state;
  }
};
export default registerReducer;
