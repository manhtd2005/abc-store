import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const LeftCollection = () => {
  const { filterProducts, toggleCategory, setPrice, setRating, resetFilter } =
    useContext(ProductContext);

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  return (
    <aside className="w-full lg:w-72">
      <div className="bg-white rounded-2xl shadow p-6 space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Category</h3>
          <ul className="space-y-3 text-gray-700">
            {categories.map((c) => (
              <li key={c}>
                <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={filterProducts.category.includes(c)}
                    onChange={() => toggleCategory(c)}
                    className="form-checkbox h-4 w-4 text-gray-600 rounded-sm border-gray-300"
                  />
                  <span className="text-base">{c}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Price</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={filterProducts.price === "0-10000"}
                  onChange={() => setPrice("0-10000")}
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">0 - 10,000</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={filterProducts.price === "10000-20000"}
                  onChange={() => setPrice("10000-20000")}
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">10,000 - 20,000</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={filterProducts.price === "20000-30000"}
                  onChange={() => setPrice("20000-30000")}
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">20,000 - 30,000</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={filterProducts.price === "50000+"}
                  onChange={() => setPrice("50000+")}
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">50,000+</span>
              </label>
            </li>
            <li>
              <button
                onClick={() => setPrice("")}
                className="mt-2 text-sm text-gray-600 underline"
              >
                Clear price
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Rating</h3>
          <ul className="space-y-3 text-gray-700">
            {[4, 3, 2, 1].map((r) => (
              <li key={r}>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={String(filterProducts.rating) === String(r)}
                    onChange={() => setRating(String(r))}
                    className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                  />
                  <span className="text-base">{r} ★ & up</span>
                </label>
              </li>
            ))}
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={!filterProducts.rating}
                  onChange={() => setRating("")}
                  className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                />
                <span className="text-base">All Ratings</span>
              </label>
            </li>
          </ul>
        </div>

        <div>
          <button
            onClick={resetFilter}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftCollection;
