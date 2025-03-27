export const getActivityType = (activityScore) => {
  if (activityScore >= 80) {
    return "Highly Activie";
  } else if (activityScore >= 60) {
    return "Very Active";
  } else if (activityScore >= 40) {
    return "Moderately Active";
  } else if (activityScore >= 20) {
    return "Lightly Active";
  } else {
    return "Sedentary";
  }
};
