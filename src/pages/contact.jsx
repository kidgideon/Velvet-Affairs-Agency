import styles from "./contact.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Contact = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <h1 className={styles.sectionTitle}>Contact Velvet Affairs Agency</h1>
      <div className={styles.grid}>
        <div className={styles.gridCard}>
          <h3>Email</h3>
          <p>support@velvetaffairs.com</p>
        </div>
        <div className={styles.gridCard}>
          <h3>Phone</h3>
          <p>+1 (907) 555-8300</p>
        </div>
        <div className={styles.gridCard}>
          <h3>Office</h3>
          <p>Anchorage, Alaska, USA</p>
        </div>
        <div className={styles.gridCard}>
          <h3>Hours</h3>
          <p>Mon – Sat: 10am – 6pm</p>
        </div>
      </div>
      <p className={styles.legalNote}>
        For urgent matters, impersonation reports, or private bookings, email <strong>legal@velvetaffairs.com</strong>.
      </p>
      <Footer />
    </div>
  );
};

export default Contact;
