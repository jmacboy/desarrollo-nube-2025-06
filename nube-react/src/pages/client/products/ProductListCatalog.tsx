import { useEffect, useState } from "react";
import { ProductRepository } from "../../../repositories/ProductRepository";
import type { Product } from "../../../models/Product";
import { ProductItem } from "./ProductItem";

export const ProductListCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const theProducts = await new ProductRepository().getProducts();
      setProducts(theProducts);
    };
    loadProducts();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
      {products.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
