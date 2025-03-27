import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { biometricFormSchema } from "../../schemas/formSchema";
import styles from "./Dashboard.module.css";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormButton from "../../components/FormButton";
import FormRadioButtonGroup from "../../components/FormRadioButtonGroup";

const Dashboard = () => {
  const methods = useForm({
    resolver: zodResolver(biometricFormSchema),
    defaultValues: { height: null, weight: null },
  });

  const onSubmit = (data) => {
    console.log("Triggered");
    console.log(data);
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Bio Metrics & Personal Data</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4">
          <FormInput
            name={"height"}
            label={"Height (cm)"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"weight"}
            label={"Weight (kg)"}
            type={"number"}
            placeholder={""}
          />

          <FormSelect
            name="bloodType"
            label="Blood Type"
            options={[
              { value: "A+" },
              { value: "A-" },
              { value: "B+" },
              { value: "B-" },
              { value: "AB+" },
              { value: "AB-" },
              { value: "O+" },
              { value: "O-" },
            ]}
          />

          <FormSelect
            name="salaryRange"
            label="Salary Range"
            options={[
              { value: "below 80,000" },
              { value: "80,000 - 150,000" },
              { value: "150,000 - 350,000" },
              { value: "above 350,000" },
            ]}
          />

          <FormInput
            name={"basePremium"}
            label={"Base Premium (LKR 1500 - LKR 100,000)"}
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

          <FormRadioButtonGroup
            description="Marital Status"
            name="maritalStatus"
            options={[
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
            ]}
            selectedValue="single"
          />

          <FormButton
            label={"Submit"}
            disabled={methods.formState.isSubmitting}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Dashboard;
