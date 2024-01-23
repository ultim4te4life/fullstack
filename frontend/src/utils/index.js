import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImage = async (file) => {
  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytes(storageRef, file);

  try {
    await uploadTask;
    const downloadImageUrl = await getDownloadURL(storageRef);
    return downloadImageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
