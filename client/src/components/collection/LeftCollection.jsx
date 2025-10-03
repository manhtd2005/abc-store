import React from "react";

const LeftCollection = () => {
  return (
    <aside className="w-full lg:w-72">
      <div className="bg-white rounded-2xl shadow p-6 space-y-8">
        {/* ------------------------- Category Filter ---------------------------- */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Category</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 rounded-sm border-gray-300"
                />
                <span className="text-base">Men's clothing</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 rounded-sm border-gray-300"
                />
                <span className="text-base">Women's clothing</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 rounded-sm border-gray-300"
                />
                <span className="text-base">Jewelery</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 rounded-sm border-gray-300"
                />
                <span className="text-base">Electronics</span>
              </label>
            </li>
          </ul>
        </div>

        {/* -------------------------- Price Filter ------------------------- */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Price</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">0 - 10000VND</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">10000 - 20000VND</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">20000 - 30000VND</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">30000 - 40000VND</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">40000 - 50000VND</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-gray-900">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                />
                <span className="text-base">50000VND+</span>
              </label>
            </li>
          </ul>
        </div>

        {/* --------------------------- Rating Filter -------------------------- */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Rating</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                />
                <span className="text-base">1-2 ★</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                />
                <span className="text-base">2-3 ★</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                />
                <span className="text-base">3-4 ★</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                />
                <span className="text-base">4-5 ★</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio h-4 w-4 text-yellow-500 border-gray-300"
                />
                <span className="text-base">All Ratings</span>
              </label>
            </li>
          </ul>
        </div>

        {/* ------------------------------ Reset Filters Button ------------------------ */}
        <div>
          <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300">
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftCollection;
