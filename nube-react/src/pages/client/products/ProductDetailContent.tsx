import { useEffect, useState } from "react";
import { ProductRepository } from "../../../repositories/ProductRepository";
import { Product } from "../../../models/Product";
import { ProductDetail } from "./ProductDetail";

type Props = {
  productSlug?: string;
};
export const ProductDetailContent = ({ productSlug }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (!productSlug) {
      return;
    }
    const loadProduct = async () => {
      const theProduct = await new ProductRepository().getProductBySlug(
        productSlug
      );
      setProduct(theProduct);
    };
    loadProduct();
  }, [productSlug]);
  return (
    <div>
      {product ? (
        <ProductDetail product={product} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};
