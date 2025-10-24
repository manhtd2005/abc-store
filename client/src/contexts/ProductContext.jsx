import { createContext, useState, useCallback, useEffect } from "react";
import { getProductById, getProducts } from "../services/productsService";
import shuffleArray from "../utils/shuffleArray";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState({
    category: [], // array of categories
    price: "", // e.g. "0-10000"
    rating: "", // e.g. "4" means >=4
    sort: "", // newest | price-asc | price-desc | name-asc | name-desc
    search: "", // keyword search
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Lấy danh sách tất cả sản phẩm
  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      const normalized = data.map((p) => ({ ...p, id: p._id || p.id }));
      setProducts(shuffleArray(normalized));
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, []);

  // Lấy thông tin sản phẩm theo id
  const fetchProductById = useCallback(async (id) => {
    try {
      return await getProductById(id);
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  }, []);

  const searchProducts = (keyword) => {
    if (!keyword?.trim()) return products;
    return products.filter((p) =>
      (p.title || p.name || "")
        .toString()
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "men's clothing":
        return "bg-blue-100 text-blue-800";
      case "women's clothing":
        return "bg-pink-100 text-pink-800";
      case "jewelery":
        return "bg-yellow-100 text-yellow-800";
      case "electronics":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetFilter = () =>
    setFilterProducts({
      category: [],
      price: "",
      rating: "",
      sort: "",
      search: "",
    });

  // helper setters for UI
  const toggleCategory = (category) =>
    setFilterProducts((prev) => {
      const exists = prev.category.includes(category);
      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== category)
          : [...prev.category, category],
      };
    });

  const setPrice = (priceRange) =>
    setFilterProducts((prev) => ({ ...prev, price: priceRange }));

  const setRating = (rating) =>
    setFilterProducts((prev) => ({ ...prev, rating }));

  const setSort = (sort) => setFilterProducts((prev) => ({ ...prev, sort }));

  // apply filters whenever products or filterProducts change
  useEffect(() => {
    let list = Array.isArray(products) ? [...products] : [];

    // search
    if (filterProducts.search) {
      const kw = filterProducts.search.toLowerCase();
      list = list.filter((p) =>
        (p.title || p.name || "").toString().toLowerCase().includes(kw)
      );
    }

    // category filter (if any categories selected)
    if (filterProducts.category && filterProducts.category.length > 0) {
      list = list.filter((p) => filterProducts.category.includes(p.category));
    }

    // rating filter (>=)
    if (filterProducts.rating) {
      const r = Number(filterProducts.rating);
      if (!Number.isNaN(r)) {
        list = list.filter((p) => {
          const ratingVal = (p.rating && (p.rating.rate || p.rating)) || 0;
          return Number(ratingVal) >= r;
        });
      }
    }

    // price filter
    if (filterProducts.price) {
      const parts = filterProducts.price.split("-").map((s) => Number(s));
      if (parts.length === 2 && !parts.some(isNaN)) {
        const [min, max] = parts;
        list = list.filter((p) => {
          const price = Number(p.price || 0);
          return price >= min && price <= max;
        });
      } else if (filterProducts.price.endsWith("+")) {
        const min = Number(filterProducts.price.replace("+", ""));
        if (!Number.isNaN(min))
          list = list.filter((p) => Number(p.price || 0) >= min);
      }
    }

    // sorting
    if (filterProducts.sort) {
      switch (filterProducts.sort) {
        case "price-asc":
          list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
          break;
        case "price-desc":
          list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
          break;
        case "name-asc":
          list.sort((a, b) =>
            String(a.title || a.name || "").localeCompare(
              String(b.title || b.name || "")
            )
          );
          break;
        case "name-desc":
          list.sort((a, b) =>
            String(b.title || b.name || "").localeCompare(
              String(a.title || a.name || "")
            )
          );
          break;
        case "newest":
        default:
          // keep original (fetchProducts already shuffled) - or sort by _id/date if available
          break;
      }
    }

    setFilteredProducts(list);
  }, [products, filterProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    filteredProducts,
    filterProducts,
    setFilterProducts,
    fetchProducts,
    fetchProductById,
    searchProducts,
    getCategoryColor,
    resetFilter,
    toggleCategory,
    setPrice,
    setRating,
    setSort,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
