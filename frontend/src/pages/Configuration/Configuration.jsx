import styles from "./Configuration.module.css";
import MainLayout from "../../layouts/MainLayout";
import FoldablePanel from "../../components/FoldablePanel";
import MetricsMargin from "./MetricsMargin";
import MetricsWeight from "./MetricsWeight";
import "./styles.css";

const Configuration = () => {
  return (
    <MainLayout>
      <div className={styles.bodyWrapper}>
        <h1>Configurations</h1>

        <div className={styles.panelWrapper}>
          <FoldablePanel title="Health Metrics Margins">
            <MetricsMargin />
          </FoldablePanel>
        </div>

        {/* <div className={styles.panelWrapper}>
          <FoldablePanel title="Health Metrics Weights">
            <MetricsWeight />
          </FoldablePanel>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default Configuration;
