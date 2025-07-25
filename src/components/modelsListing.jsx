import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./modelsListing.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const ModelsListing = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [gender, setGender] = useState("female"); // 👈 Default gender
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModels = async () => {
      const snapshot = await getDocs(collection(db, "models"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModels(list);
      const initialLikes = {};
      list.forEach(model => {
        initialLikes[model.id] = 0;
      });
      setLikes(initialLikes);
      setLoading(false);
    };
    fetchModels();
  }, []);

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const filteredModels = models
    .filter(model =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (model.gender?.toLowerCase() === gender)
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className={styles.modelsListingInterface}>
      {/* Gender Toggle Buttons */}
      <div className={styles.genderToggle}>
        <button
          className={gender === "female" ? styles.activeGender : ""}
          onClick={() => setGender("female")}
        >
          Female Models
        </button>
        <button
          className={gender === "male" ? styles.activeGender : ""}
          onClick={() => setGender("male")}
        >
          Male Models
        </button>
      </div>

      {/* Search & Sort */}
      <div className={styles.headerBar}>
        <input
          type="text"
          placeholder="Search models..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        {loading ? (
          [...Array(6)].map((_, idx) => (
            <div key={idx} className={`${styles.card} ${styles.skeletonCard}`}></div>
          ))
        ) : filteredModels.length === 0 ? (
          <p>No models found.</p>
        ) : (
          filteredModels.map((model) => (
            <div
              key={model.id}
              className={styles.card}
              onClick={() => navigate(`/profile/model/${model.id}`)}
            >
              <img src={model.profilePic} alt={model.name} />
              <div className={styles.details}>
                <h3>{model.name}</h3>
                <p className={model.available === "yes" ? styles.available : styles.unavailable}>
                  {model.available === "yes" ? "Available" : "Not Available"}
                </p>
                <div
                  className={styles.likeRow}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(model.id);
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                  <span>{likes[model.id].toLocaleString()} Likes</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ModelsListing;
