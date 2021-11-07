import axios from "axios";
import { USER_REGISTER_SUCCESS, USER_REGISTER_FAILED } from "./types";
import Swal from "sweetalert2";

export const onUserRegister = (name, email, gender) => {
  return (dispatch) => {
    if (!name || !email || !gender) {
      dispatch({ type: USER_REGISTER_FAILED, payload: "name, email and gender must be entered" });
    } else {
      axios
        .post(`https://gorest.co.in/public/v1/users?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, {
          name,
          email,
          gender,
          status: "active",
        })
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Signed in successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: USER_REGISTER_FAILED, payload: "email has already been taken / invalid" });
        });
    }
  };
};
