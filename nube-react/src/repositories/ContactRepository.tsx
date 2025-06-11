import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../firebase/FirebaseConfig";
import type { Contact } from "../pages/models/Contact";

export class ContactRepository {
  collectionName = "contacts";
  addContact(contact: Contact): Promise<Contact> {
    return new Promise((resolve, reject) => {
      if (contact.id) {
        delete contact.id;
      }
      addDoc(collection(firebaseDb, this.collectionName), {
        ...contact,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          resolve({
            ...contact,
            id: docRef.id,
          });
        })
        .catch((e) => {
          console.error("Error adding document: ", e);
          reject(e);
        });
    });
  }
  getContacts(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      getDocs(collection(firebaseDb, this.collectionName))
        .then((querySnapshot) => {
          const contacts: Contact[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            contacts.push({
              id: doc.id,
              name: data.name,
              lastName: data.lastName,
              type: data.type,
              detail: data.detail,
            });
          });
          resolve(contacts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
