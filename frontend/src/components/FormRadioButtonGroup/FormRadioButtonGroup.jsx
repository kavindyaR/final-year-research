import { useFormContext } from "react-hook-form";
import styles from "./FormRadioButtonGroup.module.css";

const FormRadioButtonGroup = ({
  description,
  options,
  name,
  selectedValue,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.radioGroupWrapper}>
      <label className={styles.description}>{description}</label>
      <div className={styles.radioGroup}>
        {options.map((option) => (
          <div className="form-check" key={option.value}>
            <input
              {...register(name)}
              className="form-check-input"
              type="radio"
              name={name}
              value={option.value}
              id={option.value}
              defaultChecked={selectedValue === option.value}
            />
            <label className="form-check-label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormRadioButtonGroup;
