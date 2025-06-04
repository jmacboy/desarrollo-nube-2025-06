import { Route, Routes } from "react-router";
import HomePage from "../pages/home/HomePage";
import LoginWithFirebasePage from "../pages/LoginWithFirebasePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LinkWighPasswordPage } from "../pages/LinkWithPasswordPage";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-ui" element={<LoginWithFirebasePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/linkpassword" element={<LinkWighPasswordPage />} />
    </Routes>
  );
};
