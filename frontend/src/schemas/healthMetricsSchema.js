import { z } from "zod";

export const metricsMarginsSchema = z.object({
  ActiveEnergyBurned: z.coerce.number().min(1.0, "Must be provide valid value"),
  BasalEnergyBurned: z.coerce.number().min(1.0, "Must be provide valid value"),
  HeartRate: z.coerce.number().min(1.0, "Must be provide valid value"),
  HeartRateVariabilitySDNN: z.coerce
    .number()
    .min(1.0, "Must be provide valid value"),
  RestingHeartRate: z.coerce.number().min(1.0, "Must be provide valid value"),
  StepCount: z.coerce.number().min(1.0, "Must be provide valid value"),
  WalkingHeartRateAverage: z.coerce
    .number()
    .min(1.0, "Must be provide valid value"),
  WalkingStepLength: z.coerce.number().min(1.0, "Must be provide valid value"),
});
