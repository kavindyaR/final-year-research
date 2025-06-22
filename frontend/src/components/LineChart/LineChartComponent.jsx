import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  // ResponsiveContainer,
} from "recharts";
import styles from "./LineChartComponent.module.css";

const LineChartComponent = ({ data }) => {
  const chartData = useMemo(() => {
    return [...data]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        }),
      }));
  }, [data]);

  const pointsToShow = 12;
  const pointWidth = 80; // px
  const chartWidth = Math.max(
    chartData.length * pointWidth,
    pointsToShow * pointWidth
  );

  return (
    <div className={styles.chartWrapper}>
      <div>
        <LineChart
          width={chartWidth}
          height={350}
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 13 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartComponent;
