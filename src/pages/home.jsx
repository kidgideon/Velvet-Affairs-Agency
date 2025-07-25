import styles from "./home.module.css"
import Navbar from "../components/navbar";
import ModelsListing from "../components/modelsListing";
import Footer from "../components/footer";
const Home = () => {
    return(
        <div className={styles.homeInterface}>
            <Navbar/>
            <ModelsListing/>
            <Footer/>
        </div>
    )
}

export default Home;