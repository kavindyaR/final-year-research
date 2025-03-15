import styles from "./FormInput.module.css";

const FormInput = ({ name, label, type = "text", placeholder }) => {
  return (
    <div className={styles.formInputWrapper}>
      <label htmlFor={name} className={styles.formLabel}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`${styles.formInput} form-control`}
        id={name}
        placeholder={placeholder}
        aria-describedby="emailHelp"
      />
    </div>
  );
};

export default FormInput;
