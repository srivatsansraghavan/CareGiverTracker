import { useCallback } from "react";
import modalstyle from "./Modal.module.css";
import signupstyle from "./Signup.module.css";

const SignUpModal = ({ show, onClose, onSignUp }) => {
  const signUpUser = useCallback(
    (event) => {
      event.preventDefault();
      const { email, password, fullname } = event.target.elements;
      onSignUp(email.value, password.value, fullname.value);
    },
    [onSignUp]
  );
  if (!show) return null;
  return (
    <div className={modalstyle.modal}>
      <div className={modalstyle.modalContent}>
        <div className={modalstyle.modalHeader}>
          <h4 className={modalstyle.modalTitle}>Sign Up</h4>
        </div>
        <div className={modalstyle.modalBody}>
          <form
            className={signupstyle.signupForm}
            id="signUpForm"
            onSubmit={signUpUser}
          >
            <label
              htmlFor="signUpEmail"
              className={`${signupstyle.signupLabel} ${signupstyle.signUpEmail}`}
            >
              Email
            </label>
            <input
              type="email"
              id="signUpEmail"
              name="email"
              className={`${signupstyle.signupField} ${signupstyle.signUpEmail}`}
            />
            <label
              htmlFor="signUpPassword"
              className={`${signupstyle.signupLabel} ${signupstyle.signUpPassword}`}
            >
              Password
            </label>
            <input
              type="password"
              id="signUpPassword"
              name="password"
              className={`${signupstyle.signupField} ${signupstyle.signUpPassword}`}
            />
            <label
              htmlFor="signUpRepeatPassword"
              className={`${signupstyle.signupLabel} ${signupstyle.signUpRepeatPassword}`}
            >
              Repeat Password
            </label>
            <input
              type="text"
              id="signUpRepeatPassword"
              className={`${signupstyle.signupField} ${signupstyle.signUpRepeatPassword}`}
            />
            <label
              htmlFor="signUpFullName"
              className={`${signupstyle.signupLabel} ${signupstyle.signUpFullName}`}
            >
              Full name
            </label>
            <input
              type="text"
              id="signUpFullName"
              name="fullname"
              className={`${signupstyle.signupField} ${signupstyle.signUpFullName}`}
            />
            <label
              htmlFor="signUpAddVerify"
              className={`${signupstyle.signupLabel} ${signupstyle.signUpAddVerify}`}
            >
              1 + 2
            </label>
            <input
              type="number"
              id="signUpAddVerify"
              className={`${signupstyle.signupField} ${signupstyle.signUpAddVerify}`}
            />
          </form>
        </div>
        <div className={modalstyle.modalFooter}>
          <button
            className={signupstyle.signupButton}
            form="signUpForm"
            type="submit"
          >
            Sign me Up!
          </button>
          <button className={signupstyle.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
