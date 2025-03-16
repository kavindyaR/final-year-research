import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Register</h2>

      <div className="p-4">
        <FormInput
          name={"name"}
          label={"Your Name"}
          type={"text"}
          placeholder={"e.g., James Smith"}
        />

        <FormInput
          name={"email"}
          label={"Email Address"}
          type={"email"}
          placeholder={"Type Your Email"}
        />

        <FormInput
          name={"password1"}
          label={"Password"}
          type={"password"}
          placeholder={"Type Your Password"}
        />

        <FormInput
          name={"password2"}
          label={"Confirm Password"}
          type={"password"}
          placeholder={"Confirm Your Password"}
        />

        <FormButton label={"Register"} />
      </div>
    </div>
  );
};

export default Register;
