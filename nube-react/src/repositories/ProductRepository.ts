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
import { firebaseDb, firebaseStorage } from "../firebase/FirebaseConfig";
import { Product } from "../models/Product";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { FileUploadResult } from "../models/FileUploadResult";
import { generateSlug } from "../utilities/TextUtilities";

export class ProductRepository {
  collectionName = "products";
  private getCollectionRef() {
    return collection(firebaseDb, this.collectionName);
  }
  getProductBySlug(slug: string): Promise<Product | null> {
    const theQuery = query(this.getCollectionRef(), where("slug", "==", slug));
    return new Promise((resolve, reject) => {
      getDocs(theQuery)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            resolve(null);
          } else {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            resolve(Product.fromFirestore(doc.id, data));
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          reject(error);
        });
    });
  }
  addProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      if (product.id) {
        delete product.id;
      }
      addDoc(this.getCollectionRef(), {
        ...product,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          resolve({
            ...product,
            id: docRef.id,
          });
        })
        .catch((e) => {
          console.error("Error adding document: ", e);
          reject(e);
        });
    });
  }
  getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      getDocs(this.getCollectionRef())
        .then((querySnapshot) => {
          const products: Product[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push(Product.fromFirestore(doc.id, data));
          });
          resolve(products);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getProductById(id: string): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      getDoc(doc(firebaseDb, this.collectionName, id))
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            resolve(Product.fromFirestore(doc.id, data));
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
  updateProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const productId = product.id;
      delete product.id;

      setDoc(doc(this.getCollectionRef(), productId), product)
        .then(() => {
          console.log("Document successfully updated!");
          product.id = productId;
          resolve(product);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          reject(error);
        });
    });
  }
  deleteProduct(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const productDoc = doc(firebaseDb, this.collectionName, id);
      deleteDoc(productDoc)
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
  uploadProductImage(productId: string, file: File): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(firebaseStorage, "products/" + productId + ".jpg");
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
  async createProductSlug(name: string, productId?: string): Promise<string> {
    let slug = generateSlug(name);
    let productBySlug = await new ProductRepository().getProductBySlug(slug);
    while (productBySlug && productBySlug.id !== productId) {
      const randomSuffix = Math.floor(Math.random() * 1000);
      const newSlug = `${slug}-${randomSuffix}`;
      console.log("Slug already exists, generating new slug:", newSlug);
      slug = newSlug;
      productBySlug = await new ProductRepository().getProductBySlug(newSlug);
    }
    return slug;
  }
}
