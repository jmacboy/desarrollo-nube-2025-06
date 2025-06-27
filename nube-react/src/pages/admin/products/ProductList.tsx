import { useContext, useEffect, useState } from "react";
import type { Product } from "../../../models/Product";
import { ProductInfo } from "./ProductInfo";
import { ProductRepository } from "../../../repositories/ProductRepository";
import { ProductContext } from "./ProductContext";

export const ProductList = () => {
  const { reloadFlag, setReloadFlag, setProductToEdit, setIsDialogOpen } =
    useContext(ProductContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const theProducts = await new ProductRepository().getProducts();
      setProducts(theProducts);
    };
    loadProducts();
  }, [reloadFlag]);
  const onProductEditCallback = (product: Product) => {
    setProductToEdit(product);
    setIsDialogOpen(true);
  };
  const onProductDeleteCallback = () => {
    setReloadFlag(reloadFlag + 1);
  };
  return (
    <>
      {products.map((product) => (
        <ProductInfo
          product={product}
          key={product.id}
          onEditCallback={onProductEditCallback}
          onDeleteCallback={onProductDeleteCallback}
        />
      ))}
    </>
  );
};
