import styles from "./contact.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import { toast } from "sonner";

const Become = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    age: "",
    height: "",
    about: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Request sent!");
    setForm({ fullName: "", email: "", age: "", height: "", about: "" });
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <h1 className={styles.sectionTitle}>Join the Velvet Circle</h1>
      <p style={{ maxWidth: "700px", margin: "0 auto 2rem", textAlign: "center" }}>
        We are building a new generation of elegance. We’re not looking for ordinary — we’re looking for unforgettable. Submit your application to join our
        agency and take the next step into a world of class.
      </p>
      <form className={styles.modelForm} onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input name="email" placeholder="Email Address" type="email" value={form.email} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="height" placeholder="Height (e.g., 5'7)" value={form.height} onChange={handleChange} required />
        <textarea name="about" placeholder="Tell us about yourself" rows={5} value={form.about} onChange={handleChange} required />
        <button type="submit">Submit Application</button>
      </form>
      <Footer />
    </div>
  );
};

export default Become;
