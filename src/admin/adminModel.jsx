import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./adminModel.module.css";
import { db, storage } from "../../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { toast } from "sonner";

const AdminModel = () => {
  const { modelId } = useParams();
  const [model, setModel] = useState(null);
  const [video, setVideo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const docRef = doc(db, "models", modelId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setModel({ id: modelId, ...docSnap.data() });
        } else {
          toast.error("Model not found.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching model.");
      }
    };
    fetchModel();
  }, [modelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModel(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "models", modelId);
      const { videos, id, ...rest } = model;
      await updateDoc(docRef, rest);
      toast.success("Model updated.");
    } catch (err) {
      toast.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleVideoUpload = async () => {
    if (!video) {
      toast.error("No video selected.");
      return;
    }

    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowedTypes.includes(video.type)) {
      toast.error("Unsupported video format.");
      return;
    }

    const loading = toast.loading("Uploading video...");
    try {
      const fileRef = ref(storage, `models/${modelId}_video_${Date.now()}`);
      const uploadTask = uploadBytesResumable(fileRef, video);

      uploadTask.on("state_changed", null, (error) => {
        console.error(error);
        toast.error("Upload failed.");
        toast.dismiss(loading);
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const randomKey = [...Array(15)]
          .map(() => Math.random().toString(36)[2])
          .join("");

        const modelRef = doc(db, "models", modelId);
        await updateDoc(modelRef, {
          videos: arrayUnion({ videoLink: downloadURL, key: randomKey }),
        });

        setModel(prev => ({
          ...prev,
          videos: [...(prev.videos || []), { videoLink: downloadURL, key: randomKey }],
        }));

        toast.success("Video uploaded.");
        toast.dismiss(loading);
      });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
      toast.dismiss(loading);
    }
  };

  const deleteVideo = async (videoObj) => {
    try {
      const modelRef = doc(db, "models", modelId);
      await updateDoc(modelRef, {
        videos: arrayRemove(videoObj),
      });

      setModel(prev => ({
        ...prev,
        videos: prev.videos.filter(v => v.key !== videoObj.key),
      }));

      toast.success("Video removed.");
    } catch (err) {
      toast.error("Failed to delete video.");
      console.error(err);
    }
  };

  if (!model) return <div>Loading...</div>;

  return (
    <div className={styles.manageModel}>
      <div className={styles.card}>
        <h2>Edit Model Info</h2>
        {["name", "age", "height", "weight", "measurements", "subscriptionPrice"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={model[field] || ""}
            onChange={handleInputChange}
            placeholder={field}
          />
        ))}

        <select
  name="gender"
  value={model.gender || "female"}
  onChange={handleInputChange}
>
  <option value="female">Female</option>
  <option value="male">Male</option>
  <option value="non-binary">Non-binary</option>
  <option value="transgender">Transgender</option>
  <option value="other">Other</option>
</select>

        <button onClick={saveChanges} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className={styles.card}>
        <h2>Upload Video</h2>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <button onClick={handleVideoUpload}>Upload Video</button>
      </div>

      <div className={styles.card}>
        <h2>Uploaded Videos</h2>
        {(!model.videos || model.videos.length === 0) ? (
          <p style={{ fontWeight: "bold" }}>No videos yet</p>
        ) : (
          model.videos.map((vid) => (
            <div key={vid.key} className={styles.videoCard}>
              <video width="100%" controls>
                <source src={vid.videoLink} />
              </video>
              <p><strong>Key:</strong> {vid.key}</p>
              <button onClick={() => deleteVideo(vid)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminModel;
