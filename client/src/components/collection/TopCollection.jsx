import React, { useContext } from "react";
import Title from "../common/Title";
import { ProductContext } from "../../contexts/ProductContext";

const TopCollection = () => {
  const { filterProducts, setSort } = useContext(ProductContext);

  return (
    <div className="flex justify-between gap-4 md:gap-6 mb-6">
      <Title text1={"CATEGORIES"} text2={"COLLECTION"} />
      <div className="flex items-center gap-3">
        <select
          value={filterProducts.sort || "newest"}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white cursor-pointer"
        >
          <option value="newest">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default TopCollection;
