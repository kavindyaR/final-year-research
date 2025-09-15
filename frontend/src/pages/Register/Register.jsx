import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "../../schemas/formSchema";
import { useAuth } from "../../context/AuthContext";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import styles from "./Register.module.css";
import logo from "../../assets/3434.jpg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    await register(username, email, password);

    // console.log("Form Submitted", data);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSquare}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.pageTitle}>Register</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4">
            <FormInput
              name={"username"}
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
              name={"password"}
              label={"Password"}
              type={"password"}
              placeholder={"Type Your Password"}
            />

            <FormInput
              name={"confirmPassword"}
              label={"Confirm Password"}
              type={"password"}
              placeholder={"Confirm Your Password"}
            />

            <FormButton
              label={"Register"}
              type={"primary"}
              disabled={methods.formState.isSubmitting}
            />

            <div className={styles.loginLabel}>
              Already have an account?{" "}
              <span
                className={styles.loginBtn}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
