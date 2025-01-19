import { useState } from "react";

const useFormValidation = (formValidation) => {
  const [errors, setErrors] = useState({});
  const formErrorHandler = (formField, fieldValue) => {
    const errorObj = formValidation(errors, formField, fieldValue);
    setErrors(errorObj);
  };
  return {
    errors,
    formErrorHandler,
  };
};

export default useFormValidation;
