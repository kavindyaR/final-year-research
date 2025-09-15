import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/formSchema";
import { useAuth } from "../../context/AuthContext";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/3434.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      setLoginError(""); // Clear previous errors
      const { email, password } = data;
      await login(email, password);
    } catch (error) {
      setLoginError("Incorrect password or email");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSquare}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.pageTitle}>Login</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4">
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

            {loginError && (
              <div className={styles.errorMessage}>
                {loginError}
              </div>
            )}

            <FormButton
              label={"Login"}
              type={"primary"}
              disabled={methods.formState.isSubmitting}
            />

            <div className={styles.regLabel}>
              Don't have an account?{" "}
              <span
                className={styles.regBtn}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
