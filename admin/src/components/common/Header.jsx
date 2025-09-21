import React from 'react'
import assets from '../../assets/assets';
import { Link } from 'react-router-dom';
import AllOrders from '../../pages/AllOrders';

const Header = () => {
    return (
        <header className="w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Mảng 1: Tên shop */}
                    <div className="flex-shrink-0 text-xl font-bold text-blue-600">
                        ABC Store
                    </div>

                    {/* Mảng 2: Menu */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to={'/allProducts'}
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            Products
                        </Link>
                        <Link to={'/allOrders'}
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            Orders
                        </Link>
                        <Link to={'/allAuth'}
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            Accounts
                        </Link>
                    </nav>

                    {/* Mảng 3: Notification */}
                    <div className="flex items-center space-x-2">
                        <img
                            src={assets.bell}
                            alt="notification bell"
                            className="w-6 h-6 cursor-pointer"
                        />
                        <span className="text-gray-700 font-medium hidden sm:inline cursor-pointer hover:opacity-80">
                            Notification
                        </span>
                    </div>

                    {/* Mảng 4: Logout */}
                    <div>
                        <button className="ml-4 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header