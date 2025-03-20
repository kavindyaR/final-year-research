import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useData } from "../../hooks/useSensorData";
import styles from "./Chart.module.css";

const Chart = () => {
  const { data, error, isLoading } = useData();
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    if (data && data.length > 0) {
      setSensorData(data[0]["types"]);
    }
  });

  const splitCamelCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  // console.log(sensorData);

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <div className={styles.pageWrapper}>
      <h2>Chart Page</h2>

      <section className={styles.gridContainer}>
        {sensorData && Object.keys(sensorData).length > 0 ? (
          Object.entries(sensorData).map(([key, value]) => (
            <div key={key} className={styles.gridItem}>
              <span className={styles.tableTitle}>{splitCamelCase(key)}</span>
              <div className={styles.tableWrapper}>
                <Table unit={value.unit} data={value.records} />
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </section>
    </div>
  );
};

export default Chart;
