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


def preprocess_health_data(file_path, username):
    data = extract_health_data(file_path)
    df = pd.DataFrame(data) # Convert XML data to Pandas DataFrame

    df = extract_necessary_records(df)
    df.to_csv('data.txt', index=False, sep=',')

    