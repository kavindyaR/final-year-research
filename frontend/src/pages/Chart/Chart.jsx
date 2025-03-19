import { useData } from "../../hooks/useSensorData";

const Chart = () => {
  const { data, error, isLoading } = useData();

  console.log(data);

  return (
    <>
      <h2>Chart Page</h2>
    </>
  );
};

export default Chart;
