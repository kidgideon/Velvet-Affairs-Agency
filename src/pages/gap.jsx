import styles from "./contact.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const AgeGate = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    localStorage.setItem("isOfAgeConfirmed", "true");
    navigate("/home");
  };

  const handleNo = () => {
    window.location.href = "https://google.com"; // or your landing page
  };

  return (
    <div className={styles.ageGatePage}>
      <Navbar />

      <div className={styles.ageGateContent}>
        <h1>🔞 Adult Content Warning</h1>
        <p>
          This site contains mature content intended for adults 18 years or older.
          By entering, you confirm that you are legally permitted to access this content.
        </p>

        <p>
          Velvet Affairs Agency is a verified companion modeling platform operating under
          international standards. We value the dignity, privacy, and security of both our
          models and clients.
        </p>

        <p>
          If you have any concerns or need assistance, please contact our support team at:
          <br />
          <strong>support@velvetaffairs.com</strong><br />
          <strong>+1 (907) 555‑9988</strong>
        </p>

        <div className={styles.ageGateActions}>
          <h2>Are you 18 years or older?</h2>
          <div className={styles.buttons}>
            <button onClick={handleYes}>Yes, I am</button>
            <button onClick={handleNo}>No, take me out</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgeGate;
