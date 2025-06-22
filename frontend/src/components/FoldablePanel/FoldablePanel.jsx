import { useState, useRef, useEffect } from "react";
import styles from "./FoldablePanel.module.css";

const FoldablePanel = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className={styles.foldable}>
      <div className={styles.foldableHeader} onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`${styles.foldableIcon} ${isOpen ? styles.open : ""}`}>
          ▶
        </span>
      </div>
      <div
        ref={contentRef}
        className={`${styles.foldableContent} ${isOpen ? "open" : ""}`}
        style={{ maxHeight }}
      >
        <div className={styles.foldableInner}>{children}</div>
      </div>
    </div>
  );
};

export default FoldablePanel;
