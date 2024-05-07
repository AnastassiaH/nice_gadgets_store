import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage/HomePage";
import { AccessoriesPage } from "./pages/AccessoriesPage/AccessoriesPage";
import { TabletsPage } from "./pages/TabletsPage";
import { PhonesPage } from "./pages/PhonesPage";
import { CartPage } from "./pages/CartPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductsProvider } from "./context/ProductsContext";
import { ProductDetailsPage } from "./pages/ProductDetailsPage/ProductDetailsPage";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export const Root = () => (
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="accessories">
                  <Route index element={<AccessoriesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="tablets">
                  <Route index element={<TabletsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="phones">
                  <Route index element={<PhonesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
