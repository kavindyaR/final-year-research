import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useSensorData, useActivityScore } from "../../hooks/useSensorData";
import styles from "./Chart.module.css";
import { formatDate, roundNumber } from "../../utils/shaper";

const Chart = () => {
  const {
    data: sensorData,
    error: sensorError,
    isLoading: sensorLoading,
  } = useSensorData();

  const {
    data: activityScore,
    error: scoreError,
    isScoreLoading: scoreLoading,
  } = useActivityScore();

  const [sensorRecords, setSensorRecords] = useState();
  const [scoreData, setScoreData] = useState();

  useEffect(() => {
    if (sensorData && sensorData.length > 0) {
      setSensorRecords(sensorData[0]["types"]);
      setScoreData(activityScore[0]);
    }
  });

  const splitCamelCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  // console.log(scoreData);

  if (sensorLoading) return <h4>Loading...</h4>;

  return (
    <div className={styles.pageWrapper}>
      <h2>Chart Page</h2>

      <div className={styles.scoreCard}>
        <div className={styles.scoreHeading}>
          Activity Score{" "}
          <span className={styles.score}>
            {scoreData && roundNumber(scoreData["value"])}
          </span>
        </div>

        <span>Last Update: {scoreData && formatDate(scoreData["date"])}</span>
      </div>

      <section className={styles.gridContainer}>
        {sensorRecords && Object.keys(sensorRecords).length > 0 ? (
          Object.entries(sensorRecords).map(([key, value]) => (
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
