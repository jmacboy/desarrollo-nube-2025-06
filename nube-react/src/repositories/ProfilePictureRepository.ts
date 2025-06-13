import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../firebase/FirebaseConfig";
import type { FileUploadResult } from "../models/FileUploadResult";

export class ProfilePictureRepository {
  setProfilePicture(userId: string, file: File): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(firebaseStorage, "profile/" + userId + ".jpg");
      uploadBytes(storageRef, file)
        .then(async (snapshot) => {
          const downloadUrl = await getDownloadURL(snapshot.ref);
          resolve({
            downloadUrl,
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          reject(error);
        });
    });
  }

  //   getProfilePicture(userId: string): string | undefined {}

  //   deleteProfilePicture(userId: string): void {}
}
