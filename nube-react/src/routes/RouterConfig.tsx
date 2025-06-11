import { Route, Routes } from "react-router";
import HomePage from "../pages/profile/HomePage";
import LoginWithFirebasePage from "../pages/LoginWithFirebasePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LinkWighPasswordPage } from "../pages/LinkWithPasswordPage";
import PhoneCheckPage from "../pages/PhoneCheckPage";
import ContactsPage from "../pages/contacts/ContactsPage";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-ui" element={<LoginWithFirebasePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/linkpassword" element={<LinkWighPasswordPage />} />
      <Route path="/phonecheck" element={<PhoneCheckPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
