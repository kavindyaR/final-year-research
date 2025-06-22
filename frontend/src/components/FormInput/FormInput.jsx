import { useFormContext } from "react-hook-form";
import styles from "./FormInput.module.css";

const FormInput = ({ name, label, type = "text", placeholder, readOnly }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.formInputWrapper}>
      <label htmlFor={name} className={styles.formLabel}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        className={`${styles.formInput} form-control`}
        id={name}
        placeholder={placeholder}
        aria-describedby="emailHelp"
        readOnly={readOnly}
        step="any"
        onWheel={(e) => e.currentTarget.blur()}
      />
      {errors[name] && (
        <p className={styles.errorText}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormInput;
