import React from "react";

const RightCollection = () => {
    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <article className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
                    <div className="relative">
                        <img className="w-full h-64 object-cover rounded-xl mb-4" />
                        <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full shadow"></span>
                        <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full"></span>
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-lg font-semibold text-gray-800"></h3>
                        <p className="text-sm text-gray-500"></p>
                        <p className="text-sm text-gray-500"></p>

                        <div className="mt-4 flex gap-2">
                            <Link className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 text-center">
                                View
                            </Link>
                            <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700">
                                Add
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default RightCollection;
