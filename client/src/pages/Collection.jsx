import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * Collection.jsx
 * - Frontend-only collection page (React + Tailwind)
 * - Sidebar filters (category / price / rating), search, sort
 * - Uses stable Pexels image URLs for products
 * - Links to ProductDetail via /product/:productId
 */

const Collection = () => {
  const products = [
    { id: 1, name: "Red Skirt", category: "Women", brand: "0-1000$", price: "$450", rating: 4.5, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 2, name: "Denim Jacket", category: "Women", brand: "1000-2000$", price: "$1200", rating: 2.5, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 3, name: "Summer Dress", category: "Women", brand: "2000-3000$", price: "$2200", rating: 3.5, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 4, name: "Floral Blouse", category: "Women", brand: "0-1000$", price: "$300", rating: 4.0, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 5, name: "Leather Jacket", category: "Women", brand: "1000-2000$", price: "$1500", rating: 3.0, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 6, name: "Silk Scarf", category: "Women", brand: "2000-3000$", price: "$2500", rating: 4.5, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 7, name: "Wool Sweater", category: "Women", brand: "0-1000$", price: "$600", rating: 2.0, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 8, name: "Cotton Shirt", category: "Women", brand: "1000-2000$", price: "$1300", rating: 3.5, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 9, name: "Chiffon Dress", category: "Women", brand: "2000-3000$", price: "$2800", rating: 4.0, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 10, name: "Linen Pants", category: "Women", brand: "0-1000$", price: "$700", rating: 3.0, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 11, name: "Cashmere Coat", category: "Women", brand: "1000-2000$", price: "$1700", rating: 4.5, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 12, name: "Velvet Top", category: "Women", brand: "2000-3000$", price: "$2400", rating: 2.5, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 13, name: "Denim Shorts", category: "Women", brand: "0-1000$", price: "$400", rating: 3.5, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 14, name: "Silk Blouse", category: "Women", brand: "1000-2000$", price: "$1400", rating: 4.0, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 15, name: "Knit Cardigan", category: "Women", brand: "2000-3000$", price: "$2600", rating: 3.0, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 16, name: "Cotton Dress", category: "Women", brand: "0-1000$", price: "$500", rating: 4.5, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 17, name: "Wool Skirt", category: "Women", brand: "1000-2000$", price: "$1600", rating: 2.0, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 18, name: "Satin Top", category: "Women", brand: "2000-3000$", price: "$2300", rating: 3.5, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 19, name: "Casual T-Shirt", category: "Men", brand: "0-1000$", price: "$200", rating: 4.0, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 20, name: "Formal Suit", category: "Men", brand: "1000-2000$", price: "$1800", rating: 3.0, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 21, name: "Blue Jeans", category: "Men", brand: "2000-3000$", price: "$2100", rating: 4.5, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 22, name: "Polo Shirt", category: "Men", brand: "0-1000$", price: "$350", rating: 2.5, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 23, name: "Bomber Jacket", category: "Men", brand: "1000-2000$", price: "$1400", rating: 3.5, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 24, name: "Chinos", category: "Men", brand: "2000-3000$", price: "$2700", rating: 4.0, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 25, name: "Hoodie", category: "Men", brand: "0-1000$", price: "$650", rating: 3.0, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 26, name: "Dress Shirt", category: "Men", brand: "1000-2000$", price: "$1600", rating: 4.5, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 27, name: "Trench Coat", category: "Men", brand: "2000-3000$", price: "$2500", rating: 2.0, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 28, name: "Sweatpants", category: "Men", brand: "0-1000$", price: "$400", rating: 3.5, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 29, name: "Blazer", category: "Men", brand: "1000-2000$", price: "$1700", rating: 4.0, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 30, name: "Knit Sweater", category: "Men", brand: "2000-3000$", price: "$2300", rating: 3.0, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 31, name: "Cargo Pants", category: "Men", brand: "0-1000$", price: "$550", rating: 4.5, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 32, name: "Leather Belt", category: "Men", brand: "1000-2000$", price: "$1200", rating: 2.5, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 33, name: "Flannel Shirt", category: "Men", brand: "2000-3000$", price: "$2600", rating: 3.5, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 34, name: "Denim Shirt", category: "Men", brand: "0-1000$", price: "$300", rating: 4.0, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 35, name: "Parka", category: "Men", brand: "1000-2000$", price: "$1900", rating: 3.0, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 36, name: "Kids T-Shirt", category: "Kids", brand: "0-1000$", price: "$200", rating: 4.5, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 37, name: "Kids Jacket", category: "Kids", brand: "1000-2000$", price: "$1100", rating: 2.0, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 38, name: "Kids Dress", category: "Kids", brand: "2000-3000$", price: "$2400", rating: 3.5, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 39, name: "Kids Hoodie", category: "Kids", brand: "0-1000$", price: "$350", rating: 4.0, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 40, name: "Kids Jeans", category: "Kids", brand: "1000-2000$", price: "$1300", rating: 3.0, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 41, name: "Kids Sweater", category: "Kids", brand: "2000-3000$", price: "$2700", rating: 4.5, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 42, name: "Kids Shorts", category: "Kids", brand: "0-1000$", price: "$250", rating: 2.5, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 43, name: "Kids Skirt", category: "Kids", brand: "1000-2000$", price: "$1400", rating: 3.5, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 44, name: "Kids Blouse", category: "Kids", brand: "2000-3000$", price: "$2500", rating: 4.0, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 45, name: "Kids Polo", category: "Kids", brand: "0-1000$", price: "$400", rating: 3.0, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 46, name: "Kids Jacket", category: "Kids", brand: "1000-2000$", price: "$1600", rating: 4.5, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" },
    { id: 47, name: "Kids Pants", category: "Kids", brand: "2000-3000$", price: "$2300", rating: 2.0, img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" },
    { id: 48, name: "Kids Shirt", category: "Kids", brand: "0-1000$", price: "$300", rating: 3.5, img: "https://images.pexels.com/photos/18186106/pexels-photo-18186106.jpeg" },
    { id: 49, name: "Kids Cardigan", category: "Kids", brand: "1000-2000$", price: "$1700", rating: 4.0, img: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
    { id: 50, name: "Kids Coat", category: "Kids", brand: "2000-3000$", price: "$2600", rating: 3.0, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 51, name: "Kids Leggings", category: "Kids", brand: "0-1000$", price: "$200", rating: 4.5, img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg" },
    { id: 52, name: "Kids Vest", category: "Kids", brand: "1000-2000$", price: "$1500", rating: 2.5, img: "https://images.pexels.com/photos/2897532/pexels-photo-2897532.jpeg" }
  ];

  // Available filters (derived from products)
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [ratingRange, setRatingRange] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Helpers
  const toggleArrayValue = (arr, setArr, value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((a) => a !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const parsePrice = (priceStr) => {
    return Number(String(priceStr).replace(/[^0-9.]/g, "")) || 0;
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Search
      const q = search.trim().toLowerCase();
      if (q) {
        const inText =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!inText) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      // Price filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Rating filter
      if (ratingRange === "1-2" && !(p.rating >= 1 && p.rating <= 2)) return false;
      if (ratingRange === "2-3" && !(p.rating > 2 && p.rating <= 3)) return false;
      if (ratingRange === "3-4" && !(p.rating > 3 && p.rating <= 4)) return false;
      if (ratingRange === "4-5" && !(p.rating > 4 && p.rating <= 5)) return false;

      return true;
    });

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedCategories, selectedBrands, ratingRange, sortOption]);

  // Clear filters
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setRatingRange("");
    setSearch("");
    setSortOption("newest");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, price or category..."
              className="w-full md:max-w-xl px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-white"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name A-Z</option>
            </select>

            <button
              onClick={() => setShowFilters((s) => !s)}
              className="md:hidden px-3 py-2 border rounded-lg bg-white"
              aria-expanded={showFilters}
              aria-controls="collection-filters"
            >
              Filters
            </button>

            <button
              onClick={clearFilters}
              className="px-3 py-2 border rounded-lg bg-white hidden md:inline-block"
              title="Clear filters"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex gap-8">
          {/* Sidebar (filters) */}
          <aside
            id="collection-filters"
            className={`w-72 transition-all ${showFilters ? "block" : "hidden"} md:block`}
          >
            <div className="bg-white rounded-2xl shadow p-5 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Category</h3>
                <ul className="space-y-2 text-gray-700">
                  {categories.map((c) => (
                    <li key={c}>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(c)}
                          onChange={() => toggleArrayValue(selectedCategories, setSelectedCategories, c)}
                          className="form-checkbox"
                        />
                        <span>{c}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Price</h3>
                <ul className="space-y-2 text-gray-700">
                  {brands.map((b) => (
                    <li key={b}>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(b)}
                          onChange={() => toggleArrayValue(selectedBrands, setSelectedBrands, b)}
                          className="form-checkbox"
                        />
                        <span>{b}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Rating</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingRange === "1-2"}
                        onChange={() => setRatingRange("1-2")}
                        className="form-radio"
                      />
                      <span>1-2 ★</span>
                    </label>
                  </li>
                  <li>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingRange === "2-3"}
                        onChange={() => setRatingRange("2-3")}
                        className="form-radio"
                      />
                      <span>2-3 ★</span>
                    </label>
                  </li>
                  <li>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingRange === "3-4"}
                        onChange={() => setRatingRange("3-4")}
                        className="form-radio"
                      />
                      <span>3-4 ★</span>
                    </label>
                  </li>
                  <li>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingRange === "4-5"}
                        onChange={() => setRatingRange("4-5")}
                        className="form-radio"
                      />
                      <span>4-5 ★</span>
                    </label>
                  </li>
                  <li>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingRange === ""}
                        onChange={() => setRatingRange("")}
                        className="form-radio"
                      />
                      <span>All ratings</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-600">
                  No products found. Try clearing filters.
                </div>
              ) : (
                filteredProducts.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-64 object-cover rounded-xl mb-4"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full shadow">
                        {item.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                        {item.price}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm text-gray-500">{item.rating} ★</p>

                      <div className="mt-4 flex gap-2">
                        <Link
                          to={`/product/${item.id}`}
                          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 text-center"
                        >
                          View
                        </Link>
                        <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700">
                          Add
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Collection;