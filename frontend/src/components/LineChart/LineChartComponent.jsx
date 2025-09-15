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

const LineChartComponent = ({ data, chartIndex = 0 }) => {
  // Research project color palette - professional and academic
  const researchColors = [
    { line: "#2563eb", area: "rgba(37, 99, 235, 0.1)", dot: "#1d4ed8" }, // Royal Blue
    { line: "#059669", area: "rgba(5, 150, 105, 0.1)", dot: "#047857" }, // Emerald Green
    { line: "#dc2626", area: "rgba(220, 38, 38, 0.1)", dot: "#b91c1c" }, // Research Red
    { line: "#7c3aed", area: "rgba(124, 58, 237, 0.1)", dot: "#6d28d9" }, // Academic Purple
    { line: "#ea580c", area: "rgba(234, 88, 12, 0.1)", dot: "#c2410c" }, // Orange
    { line: "#0891b2", area: "rgba(8, 145, 178, 0.1)", dot: "#0e7490" }, // Cyan
    { line: "#be185d", area: "rgba(190, 24, 93, 0.1)", dot: "#9d174d" }, // Pink
    { line: "#65a30d", area: "rgba(101, 163, 13, 0.1)", dot: "#4d7c0f" }, // Lime Green
  ];

  // Select color based on chart index, cycling through available colors
  const colorScheme = researchColors[chartIndex % researchColors.length];
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
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            opacity={0.7}
          />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 13, fill: '#475569' }} 
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            tick={{ fontSize: 13, fill: '#475569' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: `2px solid ${colorScheme.line}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ color: '#1f2937', fontWeight: '600' }}
            itemStyle={{ color: colorScheme.line, fontWeight: '500' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colorScheme.line}
            strokeWidth={3}
            dot={{ 
              fill: colorScheme.dot, 
              strokeWidth: 2, 
              stroke: '#ffffff',
              r: 5
            }}
            activeDot={{ 
              r: 7, 
              fill: colorScheme.dot,
              stroke: '#ffffff',
              strokeWidth: 3
            }}
            fill={colorScheme.area}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartComponent;
