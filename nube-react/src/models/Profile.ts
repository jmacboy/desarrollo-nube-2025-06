import type { DocumentData } from "firebase/firestore";

export class Profile {
  id?: string;
  notificationTokens: string[] = [];
  isAdmin?: boolean;
  static fromFirestore(id: string, data: DocumentData): Profile {
    return {
      id: id,
      notificationTokens: data.notificationTokens || [],
      isAdmin: data.isAdmin || false,
    };
  }
}
