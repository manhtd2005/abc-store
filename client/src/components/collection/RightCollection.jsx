import React, { useContext } from "react";
import ProductItem from "../common/ProductItem";
import { ProductContext } from "../../contexts/ProductContext";

const RightCollection = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RightCollection;
