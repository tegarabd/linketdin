import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

async function uploadBackgroundPhoto(
  file: File,
  filename: string
): Promise<string> {
  const backgroundPhotoRef = ref(storage, `backgroundPhoto/${filename}`);
  await uploadBytes(backgroundPhotoRef, file);
  return await getDownloadURL(backgroundPhotoRef);
}

export default uploadBackgroundPhoto;
