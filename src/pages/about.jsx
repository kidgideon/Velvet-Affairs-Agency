import styles from "./contact.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const About = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <section className={`${styles.aboutSection} ${styles.aboutLight}`}>
        <h2>Who We Are</h2>
        <p>
          Velvet Affairs is a premium modeling and lifestyle companionship agency established in 2023. We blend grace, exclusivity, and elite representation to serve
          discerning clients across the globe — from Alaska to Dubai.
        </p>
      </section>

      <section className={`${styles.aboutSection} ${styles.aboutDark}`}>
        <h2>What We Believe</h2>
        <p>
          We operate on principles of class, privacy, authenticity, and integrity. Every model is professionally vetted and trained to deliver top-tier
          companionship and representation in high-stakes environments.
        </p>
      </section>

      <section className={`${styles.aboutSection} ${styles.aboutLight}`}>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Strict confidentiality and client protection</li>
          <li>Highly curated and exclusive model list</li>
          <li>Compliance with U.S. federal regulations</li>
          <li>24/7 concierge & support for elite bookings</li>
          <li>We value human dignity over fame or flash</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default About;
