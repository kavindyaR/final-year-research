import MainLayout from "../../layouts/MainLayout";
import styles from "./Home.module.css";
import { getSensorData } from "../../api/sensorData";
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
  const navigate = useNavigate();

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

    if (user?._id) {
      fetchSensorData();
      fetchActivityScore();
    }
  }, [user]);

  return (
    <>
      <MainLayout>
        <h1>Health Monitor</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {sensorData && (
              <div className={styles.activityLevel}>
                Activity Level: <span>{activityLevel}</span>
              </div>
            )}

            <div className={styles.chartGrid}>
              {sensorData?.map((item, index) => (
                <div key={index} className={styles.gridItem}>
                  <span>{item.type}</span> | <span>{item.unit}</span>
                  <LineChartComponent data={item.records} />
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
