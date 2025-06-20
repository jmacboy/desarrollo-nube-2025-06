/**
 * Represents a user profile with notification tokens.
 */
export class Profile {
  id?: string;
  notificationTokens: string[] = [];

  /**
   * Creates a Profile instance from Firestore data.
   * @param {number} id The profile ID.
   * @param {FirebaseFirestore.DocumentData | undefined} data
   * The Firestore document data.
   * @return {Profile} A Profile instance.
   * @throws Error if data is undefined.
   */
  static fromFirestore(
    id: string,
    data: FirebaseFirestore.DocumentData | undefined,
  ): Profile {
    if (!data) {
      throw new Error("Data is undefined");
    }
    return {
      id: id,
      notificationTokens: data.notificationTokens || [],
    };
  }
}
