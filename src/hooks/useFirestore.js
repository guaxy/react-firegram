import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

const useFirestore = (collect) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const imagesRef = collection(projectFirestore, collect);
    const q = query(imagesRef, orderBy("createdAt", "desc"));
    let documents = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => documents;
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collect]);

  return { docs };
};

export default useFirestore;
