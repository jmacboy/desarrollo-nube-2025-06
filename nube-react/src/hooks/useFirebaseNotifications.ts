import { getToken, onMessage } from "firebase/messaging";
import { firebaseMessaging } from "../firebase/FirebaseConfig";
import { useEffect, useState } from "react";

export const useFirebaseNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState<boolean>(true);
  useEffect(() => {
    const obtainToken = async () => {
      try {
        const currentToken = await getToken(firebaseMessaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        if (currentToken) {
          console.log("Firebase token obtained:", currentToken);
          setToken(currentToken);
        } else {
          console.warn(
            "No registration token available. Request permission to generate one."
          );
        }
        setLoadingToken(false);
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };
    obtainToken();
    onMessage(firebaseMessaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  }, []);

  return { token, loadingToken };
};
