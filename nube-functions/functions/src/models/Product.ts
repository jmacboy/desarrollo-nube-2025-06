/**
 * Represents a user profile with notification tokens.
 */
export class Product {
  id?: string;
  description = "";
  fileUrl?: string;
  name = "";
  price = 0;
  slug?: string;

  /**
   * Creates a Profile instance from Firestore data.
   * @param {number} id The profile ID.
   * @param {FirebaseFirestore.DocumentData | undefined} data
   * The Firestore document data.
   * @return {Product} A Product instance.
   * @throws Error if data is undefined.
   */
  static fromFirestore(
    id: string,
    data: FirebaseFirestore.DocumentData | undefined,
  ): Product {
    if (!data) {
      throw new Error("Data is undefined");
    }
    return {
      id: id,
      name: data.name || "",
      description: data.description || "",
      fileUrl: data.fileUrl,
      price: data.price || 0,
      slug: data.slug,
    };
  }
}
