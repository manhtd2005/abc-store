import React, { useContext, useEffect, useMemo } from "react";
import Title from "../common/Title";
import { ProductContext } from "../../contexts/ProductContext";
import { useLocation } from "react-router-dom";
import ProductItem from "../common/ProductItem";
import { getRandomElements } from "../../utils/getRandomElements";

const ProductRelated = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const location = useLocation();

  // Chỉ fetch products khi chưa có sản phẩm
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Tính toán relatedProducts chỉ khi products hoặc location thay đổi
  const relatedProducts = useMemo(() => {
    if (products.length === 0) return [];
    if (location.pathname === "/") {
      return getRandomElements(products, 4);
    } else {
      return products.slice(0, 4);
    }
  }, [products, location.pathname]);

  return (
    <div className="py-[40px]">
      <Title text1={"RELATED"} text2={"PRODUCT"} />
      <div className="pt-[30px] flex gap-3 items-stretch">
        {relatedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;
