import { useState } from "react";
import styles from "./FormButton.module.css";

const FormButton = ({ label, disabled }) => {
  // const [isDisable, setDisable] = useState("");

  return (
    <button
      type="submit"
      className={`${styles.formBtn} btn btn-primary`}
      // disabled={isDisable}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FormButton;
