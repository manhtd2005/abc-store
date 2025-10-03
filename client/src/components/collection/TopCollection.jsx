import React from "react";
import Title from "../common/Title";

const TopCollection = () => {
  return (
    <div className="flex justify-between gap-4 md:gap-6 mb-6">
      <Title text1={"CATEGORIES"} text2={"COLLECTION"} />
      <div className="flex items-center gap-3">
        <select className="px-3 py-2 rounded-lg border bg-white">
          <option value="newest">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>

        <button className="px-3 py-2 border rounded-lg bg-white hidden md:inline-block">
          Clear
        </button>
      </div>
    </div>
  );
};

export default TopCollection;
