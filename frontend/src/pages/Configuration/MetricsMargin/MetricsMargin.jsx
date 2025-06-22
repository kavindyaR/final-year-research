import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { metricsMarginsSchema } from "../../../schemas/healthMetricsSchema";

import FormInput from "../../../components/FormInput";
import FormButton from "../../../components/FormButton";
import { useUpdateUserHealthMetrics } from "../../../hooks/useUserData";
import { getHealthMetricsById } from "../../../api/userData";
import { useAuth } from "../../../context/AuthContext";

const MetricsMargin = () => {
  const { user } = useAuth();
  const { mutate } = useUpdateUserHealthMetrics();

  const methods = useForm({
    resolver: zodResolver(metricsMarginsSchema),
  });

  useEffect(() => {
    getHealthMetricsById(user["_id"])
      .then((res) => {
        methods.reset(res.data.margins);
        // console.log(res.data.margins);
        // methods.setValue("bmi", res.data.bmi);
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = (data) => {
    mutate(
      {
        userId: user["_id"],
        metrics: data,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );

    console.log("Submitted");
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={"form p-4"}>
        <div className={"formFieldWrapper"}>
          <FormInput
            name={"ActiveEnergyBurned"}
            label={"Active Energy Burned"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"BasalEnergyBurned"}
            label={"Basal Energy Burned"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"HeartRate"}
            label={"Heart Rate"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"HeartRateVariabilitySDNN"}
            label={"Heart Rate Variability SDNN"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"RestingHeartRate"}
            label={"Resting Heart Rate"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"StepCount"}
            label={"Step Count"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"WalkingHeartRateAverage"}
            label={"Walking Heart Rate Average"}
            type={"number"}
            placeholder={""}
          />

          <FormInput
            name={"WalkingStepLength"}
            label={"Walking Step Length"}
            type={"number"}
            placeholder={""}
          />
        </div>

        <FormButton
          label={"Update"}
          type={"warning"}
          disabled={methods.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
};

export default MetricsMargin;
