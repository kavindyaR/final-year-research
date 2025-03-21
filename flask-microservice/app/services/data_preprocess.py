import pandas as pd
import xml.etree.ElementTree as ET

def extract_necessary_records(dataframe):
    df = dataframe
    drop_unnecessary_columns = ['sourceName', 'sourceVersion', 'creationDate', 'device', 'endDate']
    df = df.drop(columns=drop_unnecessary_columns) # Remove unnecessary columns
    df = df.rename(columns={'startDate': 'date'}) # Rename 'startDate' column

    # Reshape the type names
    df['type'] = df['type'].str.replace('HKQuantityTypeIdentifier', '', regex=False)
    df['type'] = df['type'].str.replace('HKCategoryTypeIdentifier', '', regex=False)

    # Extract only necessary data records
    necessary_records = ['HeartRate', 'OxygenSaturation', 'StepCount', 'BasalEnergyBurned', 
                                'ActiveEnergyBurned', 'RestingHeartRate', 'WalkingHeartRateAverage', 
                                'WalkingStepLength', 'HeartRateVariabilitySDNN']
    df = df[df['type'].isin(necessary_records)]

    # Convert 'date' to datetime if not already done
    df['date'] = pd.to_datetime(df['date'])

    # Convert 'value' column to numeric (force errors to NaN if any non-numeric values are present)
    df['value'] = pd.to_numeric(df['value'], errors='coerce')

    # sort the DataFrame by 'type' first, and then by 'date' in chronological order
    df = df.sort_values(by=['type', 'date']).reset_index(drop=True)

    # Extract just the date part from 'date' for grouping
    df['date_only'] = df['date'].dt.date

    # Remove any rows with NaN in the 'value' column
    df = df.dropna(subset=['value'])

    return df


def extract_health_data(xml_file_path):
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    records = []
    for record in root.findall(".//Record"):
        if record.attrib.get('type'):
            records.append(record.attrib)

    return records


# Define aggregation function based on 'type'
def agg_function(x):
    mean_types = ['HeartRate', 'OxygenSaturation', 'RestingHeartRate', 'WalkingHeartRateAverage', 
    'HeartRateVariabilitySDNN', 'WalkingStepLength']
    sum_types = ['ActiveEnergyBurned', 'BasalEnergyBurned', 'StepCount']

    # Access the group key (type) from the name attribute
    group_type = x.name[0]  # x.name is a tuple of the groupby keys
    
    # Calculate mean for 'mean_types' or sum for 'sum_types'
    if group_type in mean_types:
        value = x['value'].mean()
    else:
        value = x['value'].sum()
    
    # Retain the unit from the first row in the group
    unit = x['unit'].iloc[0]
    
    return pd.Series({'value': value, 'unit': unit})


def preprocess_health_data(file_path, username):
    data = extract_health_data(file_path)
    df = pd.DataFrame(data) # Convert XML data to Pandas DataFrame

    df = extract_necessary_records(df)
    # df.to_csv('data.txt', index=False, sep=',')

    # Apply groupby and aggregation
    df_avg = (
        df.groupby(['type', 'date_only'], as_index=False)
        .apply(agg_function, include_groups=False)
        .reset_index(drop=True)
    )
    df_avg = df_avg.rename(columns={'date_only': 'date'})

    return df_avg