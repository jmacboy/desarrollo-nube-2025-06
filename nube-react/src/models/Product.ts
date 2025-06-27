import type { DocumentData } from "firebase/firestore";

export class Product {
  id?: string;
  description: string = "";
  fileUrl?: string;
  name: string = "";
  price: number = 0;
  slug?: string;
  static fromFirestore(id: string, data: DocumentData): Product {
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
