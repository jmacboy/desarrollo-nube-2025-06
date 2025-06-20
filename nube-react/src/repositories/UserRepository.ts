import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase/FirebaseConfig";
import { Profile } from "../models/Profile";

export class UserRepository {
  collectionName = "profiles";
  private getCollectionRef() {
    return collection(firebaseDb, this.collectionName);
  }

  updateUserProfile(profile: Profile): Promise<Profile> {
    return new Promise((resolve, reject) => {
      const userId = profile.id;
      delete profile.id;

      setDoc(doc(this.getCollectionRef(), userId), {
        ...profile,
      })
        .then(() => {
          console.log("Document successfully updated!");
          profile.id = userId;
          resolve(profile);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          reject(error);
        });
    });
  }
  getProfileById(id: string): Promise<Profile | null> {
    return new Promise((resolve, reject) => {
      getDoc(doc(firebaseDb, this.collectionName, id))
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            resolve(Profile.fromFirestore(doc.id, data));
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          reject(error);
        });
    });
  }
  createOrUpdateNotificationToken(
    userId: string,
    notificationToken: string
  ): Promise<Profile> {
    return new Promise((resolve, reject) => {
      console.log("Creating or updating notification token for user:", userId);
      this.getProfileById(userId)
        .then((profile) => {
          let theProfile = profile;
          if (profile) {
            if (profile.notificationTokens.includes(notificationToken)) {
              console.log(
                "Notification token already exists for user:",
                userId
              );
              resolve(profile);
              return;
            }
            theProfile!.notificationTokens.push(notificationToken);
          } else {
            console.log(
              "Profile not found, creating new profile for user:",
              userId
            );
            theProfile = new Profile();

            theProfile.notificationTokens = [notificationToken];
          }
          theProfile!.id = userId;
          this.updateUserProfile(theProfile!)
            .then(() => {
              console.log("Notification token updated for user:", userId);
              resolve(theProfile!);
            })
            .catch((error) => {
              console.error("Error updating notification token:", error);
              reject(error);
            });
        })
        .catch((error) => {
          console.error("Error getting profile:", error);
          reject(error);
        });
    });
  }
  subscribeToTopic(uid: string) {
    throw new Error("Method not implemented.");
  }
}
