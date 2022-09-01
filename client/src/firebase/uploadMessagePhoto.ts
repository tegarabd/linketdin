import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

async function uploadMessagePhoto(
  file: File,
  filename: string
): Promise<string> {
  const messagePhotoRef = ref(storage, `MessagePhoto/${filename}`);
  await uploadBytes(messagePhotoRef, file);
  return await getDownloadURL(messagePhotoRef);
}

export default uploadMessagePhoto;
