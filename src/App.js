import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/Settings";
import ProductsPage from "./pages/Product/Products";
import AddProductPage from "./pages/Product/ProductsAdd";
import ProductDetails from "./pages/Product/ProductDetails";
import UniqueProductsPage from "./pages/UniqueProduct/UniqueProducts";
import UniqueAddProductPage from "./pages/UniqueProduct/UniqueProductsAdd";
import UniqueProductDetails from "./pages/UniqueProduct/UniqueProductDetails";
import ManufacturersPage from "./pages/Manufacturers";
import VesselsPage from "./pages/Vessel/Vessels";
import AddVesselPage from "./pages/Vessel/VesselAdd";
import LoginPage from "./pages/Login";
import { createContext, useContext, useState } from "react";
import ProfileSettings from "./pages/ProfileSettings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./components/Theme/ThemeContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AddCasePage from "./pages/Case/CasesAdd";
import CaseDetails from "./pages/Case/CaseDetails";
import CasesPage from "./pages/Case/Cases";
import WebSocketProvider from "./Services/WebSocketContext";

export const LoginContext = createContext();

export default function App() {
  const { theme } = useContext(ThemeContext);
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  return (
    <>
      <ToastContainer theme={theme} position="bottom-right" newestOnTop />
      <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
        <WebSocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Layout />}>
                <Route path="/" element={<ProtectedRoute />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="cases" element={<CasesPage />} />
                  <Route path="add-case" element={<AddCasePage />} />
                  <Route path="case/:id" element={<CaseDetails />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/:id" element={<ProductDetails />} />
                  <Route path="add-product" element={<AddProductPage />} />
                  <Route path="unique-products" element={<UniqueProductsPage />} />
                  <Route path="unique-products/:id" element={<UniqueProductDetails />} />
                  <Route path="add-unique-product" element={<UniqueAddProductPage />} />
                  <Route path="manufacturers" element={<ManufacturersPage />} />
                  <Route path="vessels" element={<VesselsPage />} />
                  <Route path="add-vessel" element={<AddVesselPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profilesettings" element={<ProfileSettings />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </WebSocketProvider>
      </LoginContext.Provider>
    </>
  );
}
