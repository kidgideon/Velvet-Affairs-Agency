import { useState, useEffect } from "react";
import styles from "./manage.module.css";
import { storage, db } from "../../../config/firebase";
import { toast } from "sonner";
import { collection,addDoc,getDocs} from "firebase/firestore";
import {ref, uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Manage = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    measurements: "",
    dressSize: "",
    shoeSize: "",
    hair: "",
    eyes: "",
    tattoos: "no",
    naturalBreasts: "yes",
    naturalBum: "yes",
    available: "yes",
    subscriptionPrice: "",
    profilePic: null,
    galleryPics: [],
  });

  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModels = async () => {
      const snapshot = await getDocs(collection(db, "models"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setModels(list);
    };
    fetchModels();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setForm({ ...form, profilePic: files[0] });
    } else if (name === "galleryPics") {
      setForm({ ...form, galleryPics: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.profilePic || form.galleryPics.length < 6) {
    toast.error("Upload 1 profile pic and at least 6 gallery pics.");
    return;
  }

  const loading = toast.loading("Uploading model...");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const maxSizeInBytes = 5 * 1024 * 1024;

  if (!allowedTypes.includes(form.profilePic?.type)) {
    toast.error("Profile picture must be JPEG, PNG or WEBP.");
    toast.dismiss(loading);
    return;
  }
  if (form.profilePic.size > maxSizeInBytes) {
    toast.error("Profile picture must be under 5MB.");
    toast.dismiss(loading);
    return;
  }

  for (let i = 0; i < form.galleryPics.length; i++) {
    const file = form.galleryPics[i];
    if (!allowedTypes.includes(file.type)) {
      toast.error(`Gallery image #${i + 1} must be JPEG, PNG or WEBP.`);
      toast.dismiss(loading);
      return;
    }
    if (file.size > maxSizeInBytes) {
      toast.error(`Gallery image #${i + 1} exceeds 5MB limit.`);
      toast.dismiss(loading);
      return;
    }
  }

  try {
    // Upload profile picture
    const profileRef = ref(storage, `models/${form.name}_profile`);
    const profileUploadTask = uploadBytesResumable(profileRef, form.profilePic);

    await new Promise((resolve, reject) => {
      profileUploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Profile upload is ${progress.toFixed(0)}% done`);
        },
        reject,
        resolve
      );
    });

    const profileURL = await getDownloadURL(profileRef);

    // Upload gallery images
    const galleryURLs = [];

    for (let i = 0; i < form.galleryPics.length; i++) {
      const file = form.galleryPics[i];
      const picRef = ref(storage, `models/${form.name}_gallery_${i}`);
      const uploadTask = uploadBytesResumable(picRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Gallery ${i + 1} upload is ${progress.toFixed(0)}% done`);
          },
          reject,
          resolve
        );
      });

      const url = await getDownloadURL(picRef);
      galleryURLs.push(url);
    }

    const docRef = await addDoc(collection(db, "models"), {
      ...form,
      profilePic: profileURL,
      galleryPics: galleryURLs,
    });

    toast.success("Model created successfully!");
    setModels([...models, {
      ...form,
      id: docRef.id,
      profilePic: profileURL,
      galleryPics: galleryURLs
    }]);
  } catch (err) {
    console.error(err);
    toast.error("Failed to create model");
  } finally {
    toast.dismiss(loading);
  }
};


  return (
     <div className={styles.manageModelsPage}>
      
         <form className={styles.form} onSubmit={handleSubmit}>
              <h1>Create New Model</h1>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="height" placeholder="Height" onChange={handleChange} required />
        <input type="text" name="weight" placeholder="Weight" onChange={handleChange} required />
        <input type="text" name="measurements" placeholder="Measurements" onChange={handleChange} required />
        <input type="text" name="dressSize" placeholder="Dress Size" onChange={handleChange} />
        <input type="text" name="shoeSize" placeholder="Shoe Size" onChange={handleChange} />
        <input type="text" name="hair" placeholder="Hair Color" onChange={handleChange} />
        <input type="text" name="eyes" placeholder="Eye Color" onChange={handleChange} />

        <label>Tattoos:
          <select name="tattoos" onChange={handleChange}>
            <option>no</option>
            <option>yes</option>
          </select>
        </label>

        <label>Natural Breasts:
          <select name="naturalBreasts" onChange={handleChange}>
            <option>yes</option>
            <option>no</option>
          </select>
        </label>

        <label>Natural Bum:
          <select name="naturalBum" onChange={handleChange}>
            <option>yes</option>
            <option>no</option>
          </select>
        </label>

        <label>Available:
          <select name="available" onChange={handleChange}>
            <option>yes</option>
            <option>no</option>
          </select>
        </label>

        <input type="number" name="subscriptionPrice" placeholder="Subscription Price ($)" onChange={handleChange} required />

        <label>Profile Picture
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} required />
        </label>

        <label>Gallery (at least 6)
          <input type="file" name="galleryPics" accept="image/*" onChange={handleChange} multiple required />
        </label>

        <button type="submit">Submit Model</button>
      </form>

      <div className={styles.modelList}>
        <h2>Saved Models</h2>
        {models.map(model => (
          <div
            key={model.id}
            className={styles.modelCard}
            onClick={() => navigate(`/manage/model/${model.id}`)}
          >
            <img src={model.profilePic} alt={model.name} />
            <p>{model.name}</p>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Manage;
