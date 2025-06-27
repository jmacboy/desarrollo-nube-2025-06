import { Route, Routes } from "react-router";
import HomePage from "../pages/client/profile/HomePage";
import LoginWithFirebasePage from "../pages/LoginWithFirebasePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LinkWighPasswordPage } from "../pages/LinkWithPasswordPage";
import PhoneCheckPage from "../pages/PhoneCheckPage";
import ContactsPage from "../pages/contacts/ContactsPage";
import { SettingsPage } from "../pages/SettingsPage";
import ProductsPage from "../pages/admin/products/ProductsPage";
import { PrivateRoute } from "./PrivateRoute";
import { ProductCatalogPage } from "../pages/client/products/ProductCatalogPage";
import { ProductDetailPage } from "../pages/client/products/ProductDetailPage";

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
      <Route path="/products" element={<ProductCatalogPage />} />
      <Route path="/products/:productSlug" element={<ProductDetailPage />} />
      <Route
        path="/admin/products"
        element={
          <PrivateRoute adminAccess={true}>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
