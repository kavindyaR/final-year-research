import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { biometricFormSchema } from "../../schemas/formSchema";
import { useSaveUserData } from "../../hooks/useUserData";
import { getUserDataById } from "../../api/userData";
import MainLayout from "../../layouts/MainLayout";
import styles from "./UserInfo.module.css";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormButton from "../../components/FormButton";
import FormRadioButtonGroup from "../../components/FormRadioButtonGroup";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { mutate } = useSaveUserData();

  const methods = useForm({
    resolver: zodResolver(biometricFormSchema),
    defaultValues: { height: null, weight: null },
  });

  useEffect(() => {
    getUserDataById(user["_id"])
      .then((res) => {
        methods.reset(res.data);
        // methods.setValue("bmi", res.data.bmi);
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = (data) => {
    // if (user) {
    //   mutate({ userId: user["_id"], userData: data });
    // } else {
    //   console.error("User is not authenticated");
    // }

    mutate(
      { userId: user["_id"], userData: data },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
    // console.log("Submitted", data);
  };

  return (
    <MainLayout>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Bio Metrics & Personal Data</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4">
            <FormInput
              name={"height_m"}
              label={"Height (m)"}
              type={"number"}
              placeholder={""}
              // value={userData?.height_m}
            />

            <FormInput
              name={"weight_kg"}
              label={"Weight (kg)"}
              type={"number"}
              placeholder={""}
            />

            <FormInput
              name={"bmi"}
              label={"BMI"}
              type={"number"}
              placeholder={""}
              readOnly={true}
            />

            <FormInput
              name={"age"}
              label={"Age"}
              type={"number"}
              placeholder={""}
            />

            <FormRadioButtonGroup
              description="Gender"
              name="gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              selectedValue="male"
            />

            <FormSelect
              name="blood_type"
              label="Blood Type"
              options={[
                { value: "AP", description: "A+" },
                { value: "AN", description: "A-" },
                { value: "BP", description: "B+" },
                { value: "BN", description: "B-" },
                { value: "ABP", description: "AB+" },
                { value: "ABN", description: "AB-" },
                { value: "OP", description: "O+" },
                { value: "ON", description: "O-" },
              ]}
            />

            <FormRadioButtonGroup
              description="Marital Status"
              name="marital_status"
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
              ]}
              selectedValue="single"
            />

            <FormInput
              name={"occupation"}
              label={"Occupation"}
              type={"text"}
              placeholder={""}
            />

            <FormInput
              name={"monthly_income"}
              label={"Monthly Income"}
              type={"number"}
              placeholder={""}
            />

            <FormInput
              name={"base_premium"}
              label={"Base Premium (LKR 1500 - LKR 100,000)"}
              type={"number"}
              placeholder={""}
            />

            <FormInput
              name={"membership_months"}
              label={"Membership Months"}
              type={"number"}
              placeholder={""}
            />

            <FormRadioButtonGroup
              description="Habit (smoking/drinking)"
              name="habit"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              selectedValue="no"
            />

            <FormButton
              label={"Update"}
              type={"warning"}
              disabled={methods.formState.isSubmitting}
            />
          </form>
        </FormProvider>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
