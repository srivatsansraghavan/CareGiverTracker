import modalstyle from "./Modal.module.css";
import React from "react";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Timer from "./Timer";

const Modal = ({ show, title, formId, formFields, formFooter, onAction }) => {
  const onFormSubmit = (event) => {
    event.preventDefault();
    onAction(event);
  };
  if (!show) return null;
  const generateField = (formField) => {
    switch (formField.fieldType) {
      case "dropdown":
        return (
          <FormControl fullWidth>
            <InputLabel>{formField.fieldLabel}</InputLabel>
            <Select
              key={formField.fieldId}
              id={formField.fieldId}
              name={formField.fieldName}
              margin="none"
              label={formField.fieldLabel}
              value={formField.fieldState || ""}
              onChange={(event) => {
                formField.fieldSetState(event.target.value);
              }}
            >
              {formField.fieldItems.map((opts) => (
                <MenuItem key={opts.value} value={opts.value}>
                  {opts.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "readonly":
        return (
          <Typography>
            {formField.fieldLabel}: {formField.fieldText}
          </Typography>
        );
      default:
        return (
          <FormControl fullWidth>
            <TextField
              required
              key={formField.fieldId}
              type={formField.fieldType}
              label={formField.fieldLabel}
              id={formField.fieldId}
              name={formField.fieldName}
              className={modalstyle.field}
              margin="normal"
              placeholder={""}
              value={formField.fieldState || ""}
              onChange={(event) => {
                formField.fieldSetState(event.target.value);
              }}
              onBlur={(event) => {
                formField.fieldValidate(event.target.value);
              }}
            />
            <Typography className={modalstyle.errorField}>
              {formField.fieldError?.required}
            </Typography>
            <Typography className={modalstyle.errorField}>
              {formField.fieldError?.expected}
            </Typography>
          </FormControl>
        );
    }
  };
  return (
    <div className={modalstyle.modal}>
      <div className={modalstyle.modalContent}>
        <div className={modalstyle.modalHeader}>
          <h4 className={modalstyle.modalTitle} data-testid="modal-title">
            {title}
          </h4>
        </div>
        <div className={modalstyle.modalBody}>
          <form className={modalstyle.form} id={formId} onSubmit={onFormSubmit}>
            <Stack spacing={2} alignItems="center" justifyContent="center">
              {formFields.map((formField) => generateField(formField))}
            </Stack>
          </form>
        </div>
        <div className={modalstyle.modalFooter}>
          {formFooter.map((footerField) => {
            switch (footerField.type) {
              case "submit":
                return (
                  <Button
                    variant="contained"
                    size="medium"
                    key={footerField.buttonId}
                    className={modalstyle.button}
                    form={formId}
                    type={footerField.type}
                    disabled={footerField.isNotValid}
                  >
                    {footerField.text}
                  </Button>
                );
              case "timer":
                return (
                  <Timer
                    showTimer={footerField.show}
                    outputId={footerField.outputTimeId}
                  />
                );
              default:
                return (
                  <Button
                    variant="contained"
                    size="medium"
                    key={footerField.buttonId}
                    className={modalstyle.button}
                    type={footerField.type}
                    onClick={footerField.onClick}
                    disabled={footerField.isNotValid}
                  >
                    {footerField.text}
                  </Button>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
