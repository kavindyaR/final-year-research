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
import FoldablePanel from "../../components/FoldablePanel";
import "../Configuration/styles.css";
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
      <div className={styles.pageContainer}>
        <h2 className={styles.pageTitle}>Bio Metrics & Personal Data</h2>
        
        <div className={styles.formSquare}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={"form p-4"}>
              
              <div className={styles.panelWrapper}>
                <FoldablePanel title="Physical Metrics">
                  <div className={"formFieldWrapper"}>
                    <FormInput
                      name={"height_m"}
                      label={"Height (m)"}
                      type={"number"}
                      placeholder={""}
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


                  </div>
                </FoldablePanel>
              </div>

              <div className={styles.panelWrapper}>
                <FoldablePanel title="Personal Information">
                  <div className={"formFieldWrapper"}>
                    <div className={"formFieldColumn"}>
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

                      <FormSelect
                        name="occupation"
                        label="Occupation"
                        options={[
                          { value: "Accountant", description: "Accountant" },
                          { value: "Auditor", description: "Auditor" },
                          { value: "Banking Officer", description: "Banking Officer" },
                          { value: "Business Analyst", description: "Business Analyst" },
                          { value: "Businessman", description: "Businessman" },
                          { value: "Chef", description: "Chef" },
                          { value: "Chef (Hotel)", description: "Chef (Hotel)" },
                          { value: "Chef (Restaurant)", description: "Chef (Restaurant)" },
                          { value: "Civil Engineer", description: "Civil Engineer" },
                          { value: "Construction Manager", description: "Construction Manager" },
                          { value: "Customer Service Executive", description: "Customer Service Executive" },
                          { value: "Customer Service Rep", description: "Customer Service Rep" },
                          { value: "Data Analyst", description: "Data Analyst" },
                          { value: "Digital Marketer", description: "Digital Marketer" },
                          { value: "Doctor", description: "Doctor" },
                          { value: "Electrician", description: "Electrician" },
                          { value: "Event Manager", description: "Event Manager" },
                          { value: "Graphic Designer", description: "Graphic Designer" },
                          { value: "HR Manager", description: "HR Manager" },
                          { value: "Lawyer", description: "Lawyer" },
                          { value: "Manufacturing Engineer", description: "Manufacturing Engineer" },
                          { value: "Marketing Executive", description: "Marketing Executive" },
                          { value: "Marketing Manager", description: "Marketing Manager" },
                          { value: "Nurse", description: "Nurse" },
                          { value: "Pharmacist", description: "Pharmacist" },
                          { value: "Photographer", description: "Photographer" },
                          { value: "Production Manager", description: "Production Manager" },
                          { value: "Project Manager", description: "Project Manager" },
                          { value: "Project Manager (Construction)", description: "Project Manager (Construction)" },
                          { value: "Retail Manager", description: "Retail Manager" },
                          { value: "Sales Manager", description: "Sales Manager" },
                          { value: "Sales Representative", description: "Sales Representative" },
                          { value: "Software Engineer", description: "Software Engineer" },
                          { value: "Teacher", description: "Teacher" },
                          { value: "Transportation & Logistics", description: "Transportation & Logistics" },
                          { value: "Waiter", description: "Waiter" },
                          { value: "Web Developer", description: "Web Developer" },
                        ]}
                      />
                    </div>

                    <div className={"formFieldColumn"}>
                      <FormRadioButtonGroup
                        description="Gender"
                        name="gender"
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        selectedValue="male"
                      />
                      
                      <FormRadioButtonGroup
                        description="Marital Status"
                        name="marital_status"
                        options={[
                          { value: "Single", label: "Single" },
                          { value: "Married", label: "Married" },
                        ]}
                        selectedValue="Single"
                      />
                      
                      <FormRadioButtonGroup
                        description="Habit (smoking/drinking)"
                        name="habit"
                        options={[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                        ]}
                        selectedValue="No"
                      />
                    </div>
                  </div>
                </FoldablePanel>
              </div>

              <div className={styles.panelWrapper}>
                <FoldablePanel title="Financial Information">
                  <div className={"formFieldWrapper"}>
                    <FormInput
                      name={"monthly_income"}
                      label={"Monthly Income"}
                      type={"number"}
                      placeholder={""}
                    />

                    <FormInput
                      name={"base_premium"}
                      label={"Base Premium (LKR 5,000 - LKR 100,000)"}
                      type={"number"}
                      placeholder={""}
                    />

                    <FormInput
                      name={"membership_months"}
                      label={"Membership Months"}
                      type={"number"}
                      placeholder={""}
                    />
                  </div>
                </FoldablePanel>
              </div>

              <FormButton
                label={"Update"}
                type={"primary"}
                disabled={methods.formState.isSubmitting}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
