import { getToken, onMessage } from "firebase/messaging";
import { firebaseMessaging } from "../firebase/FirebaseConfig";
import { useContext, useEffect, useState } from "react";
import { UserRepository } from "../repositories/UserRepository";
import { useFirebaseUser } from "./useFirebaseUser";
import { CONTACT_NOTIFICATION_TOPIC } from "../constants/NotificationConstants";
import { GlobalContext } from "../context/GlobalContext";

export const useFirebaseNotifications = () => {
  const { user } = useFirebaseUser();
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState<boolean>(true);
  const { addNotification } = useContext(GlobalContext);
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
      addNotification({
        title: payload.notification?.title || "New Notification",
        body: payload.notification?.body || "You have a new message.",
      });
    });
  }, [addNotification]);
  useEffect(() => {
    if (!token || !user) {
      return;
    }
    console.log("Firebase token updated:", token);
    const handleTokenUpdate = async () => {
      const repository = new UserRepository();
      const profile = await repository.createOrUpdateNotificationToken(
        user!.uid,
        token!
      );
      if (profile.isAdmin) {
        repository.subscribeToTopic(CONTACT_NOTIFICATION_TOPIC, profile);
      }
    };
    handleTokenUpdate();
  }, [token, user]);

  return { token, loadingToken };
};
