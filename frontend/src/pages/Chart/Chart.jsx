import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useData } from "../../hooks/useSensorData";

const Chart = () => {
  const { data, error, isLoading } = useData();
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    if (data && data.length > 0) {
      setSensorData(data[0]["types"]);
    }
  });

  // console.log(sensorData);

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <>
      <h2>Chart Page</h2>

      {sensorData && Object.keys(sensorData).length > 0 ? (
        Object.entries(sensorData).map(([key, value]) => (
          <div key={key}>
            <h4>{key}</h4>
            <Table unit={value.unit} data={value.records} />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default Chart;
