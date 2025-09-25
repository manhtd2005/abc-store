import React from 'react';

const ProductDetailLeft = ({ product }) => {
    // Kiểm tra an toàn: nếu product không tồn tại, không render gì cả
    if (!product) {
        return null;
    }

    return (
        <div className="lg:w-1/2 p-4">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
};

export default ProductDetailLeft;