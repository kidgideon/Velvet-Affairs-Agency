import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./modelPage.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "sonner";

const ModelPage = () => {
  const { modelId } = useParams();
  const [model, setModel] = useState(null);
  const [videoKeys, setVideoKeys] = useState({});
  const [unlockedVideos, setUnlockedVideos] = useState({});

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const docRef = doc(db, "models", modelId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setModel(snap.data());
        } else {
          toast.error("Model not found.");
        }
      } catch (err) {
        toast.error("Error loading model");
        console.error(err);
      }
    };

    fetchModel();
  }, [modelId]);

  const handleKeyInput = (e, videoKey) => {
    e.preventDefault();
    if (videoKeys[videoKey] === videoKey) {
      setUnlockedVideos((prev) => ({ ...prev, [videoKey]: true }));
      toast.success("Video unlocked!");
    } else {
      toast.error("Invalid subscription key.");
    }
  };

  if (!model) return <div>Loading...</div>;

  return (
    <div className={styles.modelPageInterface}>
      <Navbar />

      <div className={styles.wrapper}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <img
            src={model.profilePic}
            alt={model.name}
            className={styles.profilePic}
          />
          <div className={styles.modelInfoBlock}>
            <h2>{model.name}</h2>
            <div className={styles.modelDetails}>
              <div><strong>Age:</strong> {model.age}</div>
              <div><strong>Height:</strong> {model.height}</div>
              <div><strong>Weight:</strong> {model.weight}</div>
              <div><strong>Measurements:</strong> {model.measurements}</div>
              <div><strong>Dress Size:</strong> {model.dressSize}</div>
              <div><strong>Shoe Size:</strong> {model.shoeSize}</div>
              <div><strong>Hair:</strong> {model.hair}</div>
              <div><strong>Eyes:</strong> {model.eyes}</div>
              <div><strong>Tattoos:</strong> {model.tattoos}</div>
              <div><strong>Natural Breasts:</strong> {model.naturalBreasts}</div>
              <div><strong>Natural Bum:</strong> {model.naturalBum}</div>
              <div><strong>Available:</strong> {model.available}</div>
              <div><strong>Subscription Price:</strong> ${model.subscriptionPrice}</div>
            </div>

            <button
              className={styles.bookButton}
              onClick={() => toast("Contact an admin to book this model.")}
            >
              Book This Model
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className={styles.gallery}>
          <h3>Gallery</h3>
          <div className={styles.grid}>
            {model.galleryPics.map((pic, idx) => (
              <div className={styles.gridItem} key={idx}>
                <img src={pic} alt={`gallery-${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className={styles.videosSection}>
          <h3>Private Videos</h3>
          {model.videos?.length ? (
            model.videos.map((vid, idx) => (
              <div className={styles.videoCard} key={idx}>
                {unlockedVideos[vid.key] ? (
                  <video
                    controls
                    className={styles.video}
                    src={vid.videoLink}
                  />
                ) : (
                  <>
                    <div className={styles.blurred}>
                      <p>🔒 Locked Video</p>
                    </div>
                    <form
                      onSubmit={(e) => handleKeyInput(e, vid.key)}
                      className={styles.keyForm}
                    >
                      <input
                        type="text"
                        placeholder="Enter subscription key"
                        onChange={(e) =>
                          setVideoKeys((prev) => ({
                            ...prev,
                            [vid.key]: e.target.value,
                          }))
                        }
                      />
                      <button type="submit">Unlock</button>
                    </form>
                    <p
                      className={styles.contactLink}
                      onClick={() =>
                        toast("Contact an admin to get the video key.")
                      }
                    >
                      Contact an admin to get the video key
                    </p>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noVideos}>No videos yet</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ModelPage;
