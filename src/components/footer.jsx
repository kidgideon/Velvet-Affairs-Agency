import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.col}>
          <h3>Velvet Affairs Agency</h3>
          <p>
            Velvet Affairs is a licensed modeling and adult companionship agency based in Anchorage, Alaska.
            We operate in full compliance with U.S. federal and state regulations. All individuals featured are
            18+ and have consented to their participation on this platform.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Legal & Compliance</h4>
          <ul>
            <li>18+ Adults Only</li>
            <li>USC 2257 Record-Keeping Compliant</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>DMCA Protection</li>
            <li>Consent & Rights Verified</li>
            <li>HIPAA Respect for Personal Data</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Security & Integrity</h4>
          <ul>
            <li>Verified ID & Background for All Models</li>
            <li>Images Copyright-Protected</li>
            <li>Secure HTTPS Platform</li>
            <li>Biometric Verification (Coming Soon)</li>
            <li>Encrypted Cloud Infrastructure</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contact & Reports</h4>
          <p>support@velvetaffairs.com</p>
          <p>+1 (907) 555-7832</p>
          <p>Anchorage, Alaska, USA</p>
          <p>
            Report abuse or identity misuse:{" "}
            <a href="#">Click here</a>
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Velvet Affairs Agency. All Rights Reserved. 
          Operating under applicable U.S. law.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
