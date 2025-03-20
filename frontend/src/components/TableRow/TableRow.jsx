import styles from "./TableRow.module.css";

const TableRow = ({ unit, data }) => {
  const formatDate = (isoString) => {
    return isoString.split("T")[0];
  };

  const roundNumber = (num) => {
    return Math.round(num * 100) / 100;
  };

  return (
    <>
      {data && data.length > 0 ? (
        data.map((column, index) => (
          <tr key={index}>
            <td>{formatDate(column.date)}</td>
            <td>{roundNumber(column.value)}</td>
            <td>{unit}</td>
          </tr>
        ))
      ) : (
        <td colSpan={columns?.length || 1}>No data available</td>
      )}
    </>
  );
};

export default TableRow;
