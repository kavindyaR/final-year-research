import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/formSchema";
import { useAuth } from "../../context/AuthContext";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    await login(email, password);
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Login</h2>

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

          <FormButton
            label={"Login"}
            type={"primary"}
            disabled={methods.formState.isSubmitting}
          />

          <div className={styles.regLabel}>
            Already have an account?{" "}
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
  );
};

export default Login;
