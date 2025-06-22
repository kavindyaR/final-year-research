import { useFormContext } from "react-hook-form";
import styles from "./FormSelect.module.css";

const FormSelect = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.formInputWrapper}>
      <label htmlFor={name} className={styles.formLabel}>
        {label}
      </label>

      <select
        {...register(name)}
        className={`${styles.formSelect} form-select`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.description}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className={styles.errorText}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormSelect;
