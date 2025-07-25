import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.navbarComponent}>
      <div className={styles.navbar}>
        <div className={styles.firstArea}>
          <p className={styles.mainText}>
            <span className={styles.red}>Velvet</span> Affairs <span className={styles.red}>Agency</span>
          </p>
          <p className={styles.subText}>ADULT TALENT MANAGERS</p>
        </div>

        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fas fa-bars"></i>
        </div>

        <div className={`${styles.secondArea} ${menuOpen ? styles.open : ""}`}>
          <Link to="/">New Performers</Link>
          <Link to="/about">About</Link>
          <Link to="/become">Become a Model</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
