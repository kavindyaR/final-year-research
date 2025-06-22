import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useAuth } from "../../context/AuthContext";

const MainLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className={styles.navWrapper}>
        <span
          className={styles.homeBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
        <div
          className={styles.profileContainer}
          onClick={() => setIsOpen((prev) => !prev)}
          ref={dropdownRef}
          tabIndex={0}
        >
          {isOpen && (
            <div className={styles.dropdownMenu}>
              <button
                onClick={() => {
                  navigate("/user-info");
                }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/configuration");
                }}
              >
                Configurations
              </button>
              <button
                onClick={async () => {
                  await logout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className={styles.bodyWrapper}>{children}</div>
    </>
  );
};

export default MainLayout;
