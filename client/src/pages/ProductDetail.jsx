import React from "react";
import ProductDetailLeft from "../components/productDetail/ProductDetailLeft";
import ProductDetailRight from "../components/productDetail/ProductDetailRight";

const ProductDetail = () => {
    return <div className="flex items-center gap-4">
        <ProductDetailLeft />
        <ProductDetailRight />
    </div>;
};

export default ProductDetail;
