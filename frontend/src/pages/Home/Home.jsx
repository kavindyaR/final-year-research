import MainLayout from "../../layouts/MainLayout";
import styles from "./Home.module.css";
import { getSensorData, getActivityScore } from "../../api/sensorData";
import { useState, useEffect } from "react";
import LineChartComponent from "../../components/LineChart";
import { useAuth } from "../../context/AuthContext";
import { getUserDataById } from "../../api/userData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activityLevel, setActivityLevel] = useState(null);
  const [activityScore, setActivityScore] = useState(null);
  const navigate = useNavigate();

  // Function to determine activity level based on score
  const getActivityLevelFromScore = (score) => {
    if (score >= 80) return "High";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "Light";
    return "Sedentary";
  };

  // Function to get color based on score (0-100: red to yellow)
  const getActivityScoreColor = (score) => {
    // Ensure score is between 0 and 100
    const normalizedScore = Math.max(0, Math.min(100, score));
    
    // Calculate color transition from red to yellow
    const red = 255;
    const green = Math.round((normalizedScore / 100) * 255);
    const blue = 0;
    
    return `rgb(${red}, ${green}, ${blue})`;
  };

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await getSensorData(user["_id"]);
        const types = (await res.data[0]?.types) || null;
        setSensorData(types);

        if (!types) {
          navigate("/upload"); // Redirect if no sensor data
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchActivityScore = async () => {
      try {
        const res = await getUserDataById(user["_id"]);
        const { activity_level } = res.data;
        setActivityLevel(activity_level);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchActivityScoreData = async () => {
      try {
        const res = await getActivityScore(user["_id"]);
        if (res.data && res.data.length > 0) {
          const latestScore = res.data[0]?.value || 0;
          setActivityScore(Math.round(latestScore)); // Round to remove decimals
        }
      } catch (err) {
        console.error("Activity score fetch error:", err);
        setActivityScore(0); // Default to 0 if no score available
      }
    };

    if (user?._id) {
      fetchSensorData();
      fetchActivityScore();
      fetchActivityScoreData();
    }
  }, [user]);

  return (
    <>
      <MainLayout>
        <h1 className={styles.pageTitle}>Health Monitor</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {sensorData && (
              <div className={styles.activitySquare}>
                <div className={styles.activityHeader}>
                  <div className={styles.activityLevel}>
                    <div className={styles.label}>Activity Level</div>
                    <div className={styles.value}>{activityLevel || "Not Set"}</div>
                  </div>
                  <div className={styles.activityScore}>
                    <div className={styles.label}>Activity Score</div>
                    <div className={styles.value}>
                      {activityScore !== null ? activityScore : "..."}
                      {activityScore !== null && (
                        <span className={styles.scoreLevel}>
                          ({getActivityLevelFromScore(activityScore)})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {activityScore !== null && (
                  <div className={styles.activityLine}>
                    <div 
                      className={styles.activityLineFill}
                      style={{
                        width: `${Math.min(activityScore, 100)}%`,
                        backgroundColor: getActivityScoreColor(activityScore)
                      }}
                    >
                      <div className={styles.activityLineScore}>
                        {activityScore}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={styles.chartGrid}>
              {sensorData?.map((item, index) => (
                <div key={index} className={styles.gridItem}>
                  <div className={styles.chartHeader}>
                    <span className={styles.chartType}>{item.type}</span>
                    <span className={styles.chartUnit}>{item.unit}</span>
                  </div>
                  <LineChartComponent data={item.records} chartIndex={index} />
                </div>
              ))}
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;