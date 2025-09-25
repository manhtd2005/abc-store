import { useState, useEffect } from "react";
import { getProductById } from "../services/productsService";

export function useProductDetail(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                setLoading(true);
                const data = await getProductById(productId);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Product not found. Please check the product ID.");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    return { product, loading, error };
}