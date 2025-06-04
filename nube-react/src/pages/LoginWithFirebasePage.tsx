import { useEffect } from "react";
import firebase from "firebase/compat/app";
import { firebaseUi } from "../firebase/FirebaseConfig";
import "firebaseui/dist/firebaseui.css";
import Menu from "../components/Menu";

const LoginWithFirebasePage = () => {
  useEffect(() => {
    firebaseUi.start("#firebaseui-auth-container", {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/",
    });
    return () => {
      firebaseUi.reset();
    };
  }, []);

  return (
    <>
      <Menu />
      <div id="firebaseui-auth-container"></div>
    </>
  );
};

export default LoginWithFirebasePage;
