import React from "react";

const LeftCollection = () => {
    return (
        <aside>
            <div className="bg-white rounded-2xl shadow p-5 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-3">Category</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                />
                                <span></span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Price</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                />
                                <span></span>
                            </label>
                        </li>
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
                                    className="form-radio"
                                />
                                <span>All ratings</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div>
                    <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700">
                        Reset Filters
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default LeftCollection;
