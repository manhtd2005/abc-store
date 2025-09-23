import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import CategoriesProvider from "./contexts/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <CategoriesProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </CategoriesProvider>
    </BrowserRouter>
);
