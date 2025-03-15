import { useState } from "react";
import styles from "./FormButton.module.css";

const FormButton = ({ label }) => {
  const [isDisable, setDisable] = useState("");
  return (
    <button
      type="submit"
      className={`${styles.formBtn} btn btn-primary`}
      disabled={isDisable}
    >
      {label}
    </button>
  );
};

export default FormButton;
