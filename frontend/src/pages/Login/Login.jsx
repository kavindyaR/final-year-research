import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Login</h2>

      <div className="p-4">
        <FormInput
          name={"email"}
          label={"Email Address"}
          type={"email"}
          placeholder={"Type Your Email"}
        />

        <FormInput
          name={"password"}
          label={"Password"}
          type={"password"}
          placeholder={"Type Your Password"}
        />

        <FormButton label={"Login"} />
      </div>
    </div>
  );
};

export default Login;
