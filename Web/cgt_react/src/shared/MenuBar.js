import { useEffect, useState } from "react";
import menubarstyle from "./MenuBar.module.css";
import { useNavigate, Link, redirect } from "react-router-dom";
import Modal from "../shared/Modal";
import axios from "axios";
import { Button } from "@mui/material";
import {
  signUpFormValidation,
  loginFormValidation,
} from "../validation/formValidation";
import useFormValidation from "../Hooks/useFormValidation";

function MenuBar() {
  let navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpRepeatPassword, setSignUpRepeatPassword] = useState("");
  const [signUpFullName, setSignUpFullName] = useState("");
  const [signUpFormNotValid, setSignUpFormNotValid] = useState(false);
  const [loginFormNotValid, setLoginFormNotValid] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  // const [addUserResponse, setAddUserResponse] = useState("");

  const loggedInEmail = localStorage.getItem("logged_in_email");

  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const validToken = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      return true;
    }
    return false;
  };

  const addUser = () => {
    axiosClient
      .post("/user/add-user", {
        email: signUpEmail,
        password: signUpPassword,
        fullname: signUpFullName,
      })
      .then((response) => {
        if (response.status === 200) {
          //setAddUserResponse(response.data.message);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("logged_in_user", response.data.added_user);
          localStorage.setItem("logged_in_email", response.data.added_email);
          setShowSignUpModal(false);
          navigate(`/home/${response.data.added_user}`);
        } else {
          //setAddUserResponse(response.data.message);
          navigate("/");
        }
      });
  };

  const doLoginUser = () => {
    axiosClient
      .post("/user/login-user", {
        email: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          // setAddUserResponse(response.data.message);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("logged_in_user", response.data.logged_in_user);
          localStorage.setItem(
            "logged_in_email",
            response.data.logged_in_email
          );
          setShowLoginModal(false);
          navigate(`/home/${response.data.logged_in_user}`);
        } else {
          //setAddUserResponse(response.data.message);
          navigate("/");
        }
      });
  };

  useEffect(() => {
    if (signUpEmail !== "" && signUpPassword !== "" && signUpFullName !== "") {
      setSignUpFormNotValid(false);
    } else {
      setSignUpFormNotValid(true);
    }
  }, [signUpEmail, signUpPassword, signUpFullName]);

  const { errors: signUpErrors, formErrorHandler: signUpFormErrorHandler } =
    useFormValidation(signUpFormValidation);
  const { errors: loginErrors, formErrorHandler: loginFormErrorHandler } =
    useFormValidation(loginFormValidation);

  // const signUpFormErrorHandler = (field, value) => {
  //   setSignUpFormError((prevState) => [
  //     { ...prevState },
  //     { signUpEmailError: errors },
  //   ]);
  // };

  useEffect(() => {
    if (loginEmail !== "" && loginPassword !== "") {
      setLoginFormNotValid(false);
    } else {
      setLoginFormNotValid(true);
    }
  }, [loginEmail, loginPassword]);

  const signUpFormFields = [
    {
      fieldLabel: "Email",
      fieldType: "email",
      fieldId: "signUpEmail",
      fieldName: "signUpEmail",
      fieldState: signUpEmail,
      fieldSetState: (value) => {
        setSignUpEmail(value);
      },
      fieldError: signUpErrors.signUpEmail,
      fieldValidate: (value) => {
        signUpFormErrorHandler("signUpEmail", value);
      },
    },
    {
      fieldLabel: "Password",
      fieldType: "password",
      fieldId: "signUpPassword",
      fieldName: "signUpPassword",
      fieldState: signUpPassword,
      fieldSetState: (value) => {
        setSignUpPassword(value);
      },
      fieldError: signUpErrors.signUpPassword,
      fieldValidate: (value) => {
        signUpFormErrorHandler("signUpPassword", value);
      },
    },
    {
      fieldLabel: "Repeat password",
      fieldType: "text",
      fieldId: "signUpRepeatPassword",
      fieldName: "signUpRepeatPassword",
      fieldState: signUpRepeatPassword,
      fieldSetState: (value) => {
        setSignUpRepeatPassword(value);
      },
      fieldError: signUpErrors.signUpRepeatPassword,
      fieldValidate: (value) => {
        signUpFormErrorHandler("signUpRepeatPassword", value);
      },
    },
    {
      fieldLabel: "Full Name",
      fieldType: "text",
      fieldId: "signUpFullName",
      fieldName: "signUpFullName",
      fieldState: signUpFullName,
      fieldSetState: (value) => {
        setSignUpFullName(value);
      },
      fieldError: signUpErrors.signUpFullName,
      fieldValidate: (value) => {
        signUpFormErrorHandler("signUpFullName", value);
      },
    },
  ];

  const signUpFormButtons = [
    {
      type: "submit",
      text: "Sign me Up!",
      buttonId: "signUpSubmit",
      isNotValid: signUpFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: () => setShowSignUpModal(false),
      buttonId: "signUpClose",
    },
  ];

  const loginFormFields = [
    {
      fieldLabel: "Email",
      fieldType: "email",
      fieldId: "loginEmail",
      fieldName: "loginEmail",
      fieldState: loginEmail,
      fieldSetState: (value) => {
        setLoginEmail(value);
      },
      fieldError: loginErrors.loginEmail,
      fieldValidate: (value) => {
        loginFormErrorHandler("loginEmail", value);
      },
    },
    {
      fieldLabel: "Password",
      fieldType: "password",
      fieldId: "loginPassword",
      fieldName: "loginPassword",
      fieldState: loginPassword,
      fieldSetState: (value) => {
        setLoginPassword(value);
      },
      fieldError: loginErrors.loginPassword,
      fieldValidate: (value) => {
        loginFormErrorHandler("loginPassword", value);
      },
    },
  ];

  const loginFormButtons = [
    {
      type: "submit",
      text: "Log me In!",
      buttonId: "loginSubmit",
      isNotValid: loginFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: () => setShowLoginModal(false),
      buttonId: "loginClose",
    },
  ];

  const profileFormFields = [
    {
      fieldLabel: "Email",
      fieldType: "readonly",
      fieldText: loginEmail,
    },
  ];

  const profileFormButtons = [
    {
      type: "button",
      text: "Close",
      onClick: () => setShowProfileModal(false),
      buttonId: "loginClose",
    },
  ];

  return (
    <>
      <Modal
        show={showSignUpModal}
        title="Sign Up"
        formId="signUpForm"
        formFields={signUpFormFields}
        formFooter={signUpFormButtons}
        onAction={addUser}
      />
      <Modal
        show={showLoginModal}
        title="Login"
        formId="loginForm"
        formFields={loginFormFields}
        formFooter={loginFormButtons}
        onAction={doLoginUser}
      />
      <Modal
        show={showProfileModal}
        title="Profile"
        formId="profileForm"
        formFields={profileFormFields}
        formFooter={profileFormButtons}
      />
      <ul className={menubarstyle.menuBar}>
        <li key="header" className={menubarstyle.menuHeader}>
          Caregiver Tracker
        </li>
        {!validToken() && (
          <>
            <li key="login">
              <Button
                sx={{
                  position: "absolute",
                  right: 95,
                  color: "black",
                }}
                onClick={openLoginModal}
              >
                Login
              </Button>
            </li>
            <li key="signup">
              <Button
                sx={{
                  position: "absolute",
                  right: 15,
                  color: "black",
                }}
                onClick={openSignUpModal}
                data-testid="signup-button"
              >
                Signup
              </Button>
            </li>
          </>
        )}
        {validToken() && (
          <>
            <li key="profile">
              <Button
                sx={{
                  position: "absolute",
                  right: 115,
                  color: "black",
                }}
                onClick={openProfileModal}
              >
                {loggedInEmail}
              </Button>
            </li>
            <li key="logout">
              <Link className={menubarstyle.logoutLink} to="logout">
                Logout
              </Link>
            </li>
          </>
        )}
        <>
          <span>{process.env.NODE_ENV}</span>
        </>
      </ul>
    </>
  );
}

export default MenuBar;

export async function logoutLoader() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("logged_in_email");
  localStorage.removeItem("logged_in_user");
  return redirect("/");
}
