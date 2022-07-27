import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    ref(projectStorage, "images");
    //const storageRef = projectStorage.ref(file.name);
    const storageRef = ref(projectStorage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(projectFirestore, "images");
    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = Date.now();
        const docRef = doc(collectionRef);
        await setDoc(docRef, { url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
