export const signUpFormValidation = (errorState, signUpField, signUpValue) => {
  let errors = {
    signUpEmail: { ...errorState.signUpEmail },
    signUpPassword: { ...errorState.signUpPassword },
    signUpRepeatPassword: { ...errorState.signUpRepeatPassword },
    signUpFullName: { ...errorState.signUpFullName },
  };
  switch (signUpField) {
    case "signUpEmail":
      errors.signUpEmail.required = !signUpValue
        ? "Email field is required"
        : "";
      errors.signUpEmail.expected =
        signUpValue && !/^.*@.*\.+[a-z]*$/.test(signUpValue)
          ? "Please enter a valid email address"
          : "";
      break;
    case "signUpPassword":
      errors.signUpPassword.required = !signUpValue
        ? "Password field is required"
        : "";
      errors.signUpPassword.expected =
        signUpValue && !/^.*@.*\.+[a-z]*$/.test(signUpValue)
          ? "Please enter a valid password"
          : "";
      break;
    case "signUpRepeatPassword":
      errors.signUpRepeatPassword.required = !signUpValue
        ? "Repeat Password field is required"
        : "";
      break;
    case "signUpFullName":
      errors.signUpFullName.required = !signUpValue
        ? "Full Name field is required"
        : "";
      break;
    default:
  }
  return errors;
};

export const loginFormValidation = (errorState, loginField, loginValue) => {
  let errors = {
    loginEmail: { ...errorState.loginEmail },
    loginPassword: { ...errorState.loginPassword },
  };
  switch (loginField) {
    case "loginEmail":
      errors.loginEmail.required = !loginValue ? "Email field is required" : "";
      errors.loginEmail.expected =
        loginValue && !/^.*@.*\.+[a-z]*$/.test(loginValue)
          ? "Please enter a valid email address"
          : "";
      break;
    case "loginPassword":
      errors.loginPassword.required = !loginValue
        ? "Password field is required"
        : "";
      errors.loginPassword.expected =
        loginValue && !/^.*@.*\.+[a-z]*$/.test(loginValue)
          ? "Please enter a valid password"
          : "";
      break;
    default:
  }
  return errors;
};
