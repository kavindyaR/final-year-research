import { useState } from "react";
import styles from "./FormButton.module.css";

const FormButton = ({ label, disabled, type }) => {
  // const [isDisable, setDisable] = useState("");

  return (
    <button
      type="submit"
      className={`${styles.formBtn} btn btn-${type}`}
      // disabled={isDisable}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FormButton;
