import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useSensorData, useActivityScore } from "../../hooks/useSensorData";
import { formatDate, roundNumber } from "../../utils/shaper";
import { useAuth } from "../../context/AuthContext";
import styles from "./Chart.module.css";
import { getActivityType } from "../../utils/activityType";

const Chart = () => {
  const { user } = useAuth();

  const {
    data: sensorData,
    error: sensorError,
    isLoading: sensorLoading,
  } = useSensorData(user["_id"]);

  const {
    data: activityScore,
    error: scoreError,
    isLoading: scoreLoading,
  } = useActivityScore(user["_id"]);

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

        <div>
          Activity Status:{" "}
          <span className={styles.activityTypeLabel}>
            {getActivityType(scoreData?.value)}
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
