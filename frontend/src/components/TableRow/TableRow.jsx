import styles from "./TableRow.module.css";

const TableRow = ({ unit, data }) => {
  return (
    <>
      {data && data.length > 0 ? (
        data.map((column, index) => (
          <tr key={index}>
            <td>{column.date}</td>
            <td>{column.value}</td>
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
