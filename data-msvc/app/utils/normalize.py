# Function to calculate normalized score for each row
def calculate_percentage_score(row, margins):
    activity_type = row['type']
    value = row['value']
    margin = margins.get(activity_type, 1)  # Default to 1 if margin not found
    return (value / margin) * 100



# Function to calculate normalized score for each row
def calculate_weighted_score(row, weights):
    activity_type = row['type']
    value = row['scaled_score']
    margin = weights.get(activity_type, 1)  # Default to 1 if margin not found
    return value * margin