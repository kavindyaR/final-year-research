import styles from "./TableRow.module.css";
import { formatDate, roundNumber } from "../../utils/shaper";

const TableRow = ({ unit, data }) => {
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
