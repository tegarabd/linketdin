import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

async function uploadPostAttachment(
  file: File,
  filename: string
): Promise<string> {
  const postAttachmentRef = ref(storage, `postAttachment/${filename}`);
  await uploadBytes(postAttachmentRef, file);
  return await getDownloadURL(postAttachmentRef);
}

export default uploadPostAttachment;
