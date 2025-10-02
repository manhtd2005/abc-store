import { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

const SearchBar = ({ onSelectProduct }) => {
  const { searchProducts, getCategoryColor } = useContext(ProductContext);
  const [keyword, setKeyword] = useState("");

  const results = searchProducts(keyword);

  // Event close searchbar as click other zone
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".search-bar-container") &&
        !e.target.closest(".search-icon-button")
      ) {
        setKeyword("");
        onSelectProduct?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onSelectProduct]);

  return (
    <div className="relative flex justify-center py-6 px-4 animate-fade-in search-bar-container">
      {/* ------------------------- SearchBar -------------------------- */}
      <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-full bg-white shadow-md overflow-hidden">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Find product..."
          className="flex-1 px-5 py-3 text-gray-700 focus:outline-none rounded-l-full"
        />
        <button className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition-all rounded-r-full flex items-center gap-1">
          <Search size={20} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* ------------------------- Value -------------------------- */}
      {keyword.trim() && results.length > 0 && (
        <div className="absolute top-[80px] w-full max-w-2xl max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white z-50">
          {results.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => {
                setKeyword("");
                onSelectProduct?.();
              }}
              className="flex items-center gap-4 p-3 border-b hover:bg-blue-50 transition cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-contain rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{product.title}</p>
                <p
                  className={`text-sm text-gray-500 inline-block px-3 py-1 rounded-full font-medium shadow-sm ${getCategoryColor(
                    product.category
                  )}`}
                >
                  {product.category}
                </p>
              </div>
              <b className="text-blue-600 text-xl">{product.price}$</b>
            </Link>
          ))}
        </div>
      )}

      {/* ------------------------------ No Product ------------------------------ */}
      {keyword.trim() && results.length === 0 && (
        <div className="absolute top-[80px] w-full max-w-2xl border border-gray-200 rounded-lg shadow-lg bg-white z-50 p-4 text-gray-500">
          No product
        </div>
      )}
    </div>
  );
};

export default SearchBar;
