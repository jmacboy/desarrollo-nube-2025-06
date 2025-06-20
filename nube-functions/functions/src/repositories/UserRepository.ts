import {getMessaging} from "firebase-admin/messaging";
import {Profile} from "../models/Profile";

/**
 * Repository for user profile operations in Firestore.
 */
export class UserRepository {
  collectionName = "profiles";

  /**
   * Creates an instance of UserRepository.
   * @param {FirebaseFirestore.Firestore} firestore
   * The Firestore instance to use for database operations.
   */
  constructor(private firestore: FirebaseFirestore.Firestore) {}

  /**
   * Retrieves a user profile by its ID.
   * @param {number} id The ID of the profile to retrieve.
   * @return {Promise<Profile | null>}
   * A promise that resolves to the Profile or null if not found.
   */
  getProfileById(id: string): Promise<Profile | null> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(this.collectionName)
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
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
  /**
   * Subscribes the given profile to a topic.
   * @param {Profile} profile The profile to subscribe.
   * @param {string} topic The topic to subscribe to.
   */
  subscribeToTopic(profile: Profile, topic: string): void {
    if (!profile.id) {
      console.error("Profile ID is required to subscribe to topic.");
      return;
    }
    getMessaging()
      .subscribeToTopic(profile.notificationTokens, topic)
      .then((response) => {
        console.log(
          `Successfully subscribed profile ${profile.id} to topic:`,
          response,
        );
      })
      .catch((error) => {
        console.error(
          `Error subscribing profile ${profile.id} to topic:`,
          error,
        );
      });
  }
}
