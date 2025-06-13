import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../firebase/FirebaseConfig";
import { Contact } from "../pages/models/Contact";

export class ContactRepository {
  collectionName = "contacts";
  private getCollectionRef() {
    return collection(firebaseDb, this.collectionName);
  }
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
      getDocs(this.getCollectionRef())
        .then((querySnapshot) => {
          const contacts: Contact[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            contacts.push(Contact.fromFirestore(doc.id, data));
          });
          resolve(contacts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getContactById(id: string): Promise<Contact | null> {
    return new Promise((resolve, reject) => {
      getDoc(doc(firebaseDb, this.collectionName, id))
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            resolve(Contact.fromFirestore(doc.id, data));
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
  getContactsByOwnerId(ownerId: string): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      const theQuery = query(
        this.getCollectionRef(),
        where("ownerId", "==", ownerId)
      );
      getDocs(theQuery)
        .then((querySnapshot) => {
          const contacts: Contact[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            contacts.push(Contact.fromFirestore(doc.id, data));
          });
          resolve(contacts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateContact(contact: Contact): Promise<Contact> {
    return new Promise((resolve, reject) => {
      const contactId = contact.id;
      delete contact.id;

      setDoc(doc(this.getCollectionRef(), contactId), contact)
        .then(() => {
          console.log("Document successfully updated!");
          contact.id = contactId;
          resolve(contact);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          reject(error);
        });
    });
  }
  deleteContact(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const contactDoc = doc(firebaseDb, this.collectionName, id);
      deleteDoc(contactDoc)
        .then(() => {
          console.log("Document successfully deleted!");
          resolve();
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
          reject(error);
        });
    });
  }
}
