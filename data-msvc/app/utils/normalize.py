metrics_margins = {
    'ActiveEnergyBurned': 800, 
    'BasalEnergyBurned': 2250, 
    'HeartRate': 80, 
    'HeartRateVariabilitySDNN': 80, 
    'OxygenSaturation': 100, 
    'RestingHeartRate': 70, 
    'StepCount': 10000, 
    'WalkingHeartRateAverage': 110, 
    'WalkingStepLength': 80
}

# Function to calculate normalized score for each row
def calculate_percentage_score(row, margins):
    activity_type = row['type']
    value = row['value']
    margin = margins.get(activity_type, 1)  # Default to 1 if margin not found
    return (value / margin) * 100


weights = {
    'ActiveEnergyBurned': 0.15,
    'BasalEnergyBurned': 0.10,
    'HeartRate': 0.20,
    'HeartRateVariabilitySDNN': 0.05,
    'OxygenSaturation': 0.10,
    'RestingHeartRate': 0.05,
    'StepCount': 0.15,
    'WalkingHeartRateAverage': 0.10,
    'WalkingStepLength': 0.10
}

# Function to calculate normalized score for each row
def calculate_weighted_score(row, weights):
    activity_type = row['type']
    value = row['scaled_score']
    margin = weights.get(activity_type, 1)  # Default to 1 if margin not found
    return value * margin
