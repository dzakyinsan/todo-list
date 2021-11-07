import axios from "axios";
import Swal from "sweetalert2";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT } from "./types";

export const onUserLogin = (name, email) => {
  return (dispatch) => {
    if (!name || !email) {
      dispatch({ type: USER_LOGIN_FAILED, payload: "email and password must be entered" });
    } else {
      axios
        .get(`https://gorest.co.in/public/v1/users?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, {
          params: {
            name: name,
            email: email,
          },
        })
        .then((res) => {
          if (res.data.data.length) {
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Signed in successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.data[0] });
          } else {
            dispatch({ type: USER_LOGIN_FAILED, payload: "user not found" });
          }
        })
        .catch((err) => {
          dispatch({ type: USER_LOGIN_FAILED, payload: "user not found" });
        });
    }
  };
};

export const keepLogin = (name, email) => {
  return (dispatch) => {
    axios
      .get(`https://gorest.co.in/public/v1/users?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, {
        params: {
          name: name,
          email: email,
        },
      })
      .then((res) => {
        if (res.data.data.length) {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.data[0] });
        } else {
          dispatch({ type: USER_LOGIN_FAILED, payload: "system error" });
        }
      })
      .catch((err) => {
        dispatch({ type: USER_LOGIN_FAILED, payload: "system error" });
      });
  };
};

export const onUserLogout = () => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "grey",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!");
        localStorage.clear();
        dispatch({ type: USER_LOGOUT });
      }
    });
  };
};
