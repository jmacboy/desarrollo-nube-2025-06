import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  type User,
  signOut,
  linkWithCredential,
  PhoneAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAnalytics, firebaseAuth } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { UserRepository } from "../repositories/UserRepository";
import type { Profile } from "../models/Profile";
import { setUserProperties } from "firebase/analytics";

export const useFirebaseUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    if (user) {
      return;
    }

    onAuthStateChanged(firebaseAuth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        setUserProperties(firebaseAnalytics, {
          userId: loggedInUser.uid,
          email: loggedInUser.email || "",
          displayName: loggedInUser.displayName || "",
        });
        if (!profile) {
          new UserRepository()
            .getProfileById(loggedInUser.uid)
            .then((userProfile) => {
              setProfile(userProfile);
              if (userProfile?.isAdmin) {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
              setUserLoading(false);
            });
        } else {
          setUserLoading(false);
        }
      }
    });
  }, [user, profile]);
  const loginWithFirebase = (email: string, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
      });
  };
  const registerWithFirebase = (
    email: string,
    password: string,
    fullName: string
  ) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Registered and Signed in
        const user = userCredential.user;

        console.log("User signed in:", user);
        updateProfile(user, {
          displayName: fullName,
        })
          .then(() => {
            console.log("Profile updated successfully");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);

        console.log("User signed in with Google:", result.user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error signing in with Google:", {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };
  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log("User signed out successfully");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const linkWithPassword = (email: string, password: string) => {
    if (!user) {
      return;
    }
    const credential = EmailAuthProvider.credential(email, password);
    linkWithCredential(user, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Account linking success", user);
      })
      .catch((error) => {
        console.log("Account linking error", error);
      });
  };
  const linkWithPhone = async (
    verificationId: string,
    verificationCode: string
  ) => {
    if (!user) {
      return false;
    }
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    const userCred = await linkWithCredential(user, credential);
    if (!userCred) {
      console.error("Failed to link with phone");
      return false;
    }
    console.log("Account linking success", user);
    return true;
  };

  return {
    user,
    isAdmin,
    userLoading,
    loginWithFirebase,
    registerWithFirebase,
    loginWithGoogle,
    logout,
    linkWithPassword,
    linkWithPhone,
  };
};
