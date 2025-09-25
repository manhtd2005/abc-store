import React from "react";

const TopCollection = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center gap-3">
                <select
                    className="px-3 py-2 rounded-lg border bg-white"
                    aria-label="Sort products"
                >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="name">Name A-Z</option>
                </select>

                <button
                    className="md:hidden px-3 py-2 border rounded-lg bg-white"
                    aria-controls="collection-filters"
                >
                    Filters
                </button>

                <button
                    className="px-3 py-2 border rounded-lg bg-white hidden md:inline-block"
                    title="Clear filters"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default TopCollection;
