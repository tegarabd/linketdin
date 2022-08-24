import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

async function uploadProfilePhoto(file: File, filename: string): Promise<string> {
  const profilePhotoRef = ref(storage, `profilePhoto/${filename}`)
  await uploadBytes(profilePhotoRef, file);
  return await getDownloadURL(profilePhotoRef)
}

export default uploadProfilePhoto