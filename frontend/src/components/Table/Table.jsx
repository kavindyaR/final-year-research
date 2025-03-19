import styles from "./Table.module.css";
import TableRow from "../TableRow";

const Table = ({ unit, data }) => {
  return (
    <table className="table">
      <tbody>
        {data && data.length > 0 ? (
          <TableRow unit={unit} data={data} />
        ) : (
          <>No data</>
        )}
      </tbody>
    </table>
  );
};

export default Table;
