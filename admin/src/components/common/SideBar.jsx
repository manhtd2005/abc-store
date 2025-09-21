import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate()
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="p-4 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
            Account
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => { navigate('/allProducts') }}
                className="block px-3 py-2 rounded-lg hover:bg-gray-700 w-full text-left transition cursor-pointer"
              >
                List
              </button>
            </li>
            <li>
              <button
                onClick={() => { navigate('/addProducts') }}
                className="block px-3 py-2 rounded-lg hover:bg-gray-700 w-full text-left cursor-pointer transition"
              >
                Add
              </button>
            </li>
          </ul>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
            Product
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block px-3 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                List
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Add
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default SideBar