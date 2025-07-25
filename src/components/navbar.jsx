import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.navbarComponent}>
      <div className={styles.navbar}>
        <div className={styles.firstArea}>
          <p>
            <span className={styles.red}>Velvet</span> Affairs <span className={styles.red}>Agency</span>
          </p>
        </div>

        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fas fa-bars"></i>
        </div>

        <div className={`${styles.secondArea} ${menuOpen ? styles.open : ""}`}>
          <Link to="/">New Performers</Link>
          <Link to="/females">Females</Link>
          <Link to="/become-model">Become a Model</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
