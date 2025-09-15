import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useAuth } from "../../context/AuthContext";
import logoImage from "../../assets/3434.jpg";

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

  console.log('MainLayout isOpen state:', isOpen);

  return (
    <>
      <nav className={styles.navWrapper}>
        <button
          className={styles.homeBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          🏠 Home
        </button>
        <div
          className={styles.profileContainer}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Profile container clicked, current isOpen:', isOpen);
            setIsOpen((prev) => {
              console.log('Setting isOpen to:', !prev);
              return !prev;
            });
          }}
          ref={dropdownRef}
          tabIndex={0}
        >
          <img 
            src={logoImage} 
            alt="Health Monitor Logo" 
            className={styles.logoImage}
          />
          {/* Visual indicator for dropdown state */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '8px',
            height: '8px',
            backgroundColor: isOpen ? '#22c55e' : '#ef4444',
            borderRadius: '50%',
            border: '1px solid white'
          }} />
          {isOpen && (
            <div className={styles.dropdownMenu}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Profile button clicked');
                  setIsOpen(false);
                  navigate("/user-info");
                }}
              >
                Profile
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Configuration button clicked');
                  setIsOpen(false);
                  navigate("/configuration");
                }}
              >
                Configurations
              </button>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  console.log('Logout button clicked');
                  setIsOpen(false);
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
