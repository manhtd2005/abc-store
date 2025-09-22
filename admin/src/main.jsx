import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./contexts/ProductContext.jsx";
import AuthAdminProvider from "./contexts/AuthAdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthAdminProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthAdminProvider>
  </BrowserRouter>
);
