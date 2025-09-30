import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./contexts/ProductContext.jsx";
import AuthAdminProvider from "./contexts/AuthAdminContext.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <AuthAdminProvider>
        <ProductProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ProductProvider>
      </AuthAdminProvider>
    </UserProvider>
  </BrowserRouter>
);
