import type { DocumentData } from "firebase/firestore";
import { ContactType } from "./ContactType";

export class Contact {
  id?: string;
  type: ContactType = ContactType.Email;
  detail: string = "";
  name: string = "";
  lastName: string = "";
  ownerId: string = "";
  static fromFirestore(id: string, data: DocumentData): Contact {
    return {
      id: id,
      name: data.name || "",
      lastName: data.lastName || "",
      type: data.type || ContactType.Email,
      detail: data.detail || "",
      ownerId: data.ownerId || "",
    };
  }
}
