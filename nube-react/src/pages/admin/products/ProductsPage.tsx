import { Container } from "../../../components/Container";
import type { Product } from "../../../models/Product";
import Menu from "../../../components/Menu";
import Button from "../../../components/Button";
import { ProductDialog } from "./ProductDialog";
import { ProductList } from "./ProductList";
import { useState } from "react";
import { ProductContext } from "./ProductContext";

const ProductsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);
  const onAddProductClick = () => {
    setProductToEdit(null);
    setIsDialogOpen(true);
  };
  return (
    <>
      <Menu />
      <ProductContext.Provider
        value={{
          reloadFlag,
          setReloadFlag,
          isDialogOpen,
          setIsDialogOpen,
          productToEdit,
          setProductToEdit,
        }}
      >
        <Container>
          <div className="flex justify-between items-center mb-4 mt-4">
            <h1 className="text-2xl mt-2 mb-2">Products</h1>
            <Button onClick={onAddProductClick}>Add product</Button>
          </div>
          <ProductList />
        </Container>
        <ProductDialog />
      </ProductContext.Provider>
    </>
  );
};

export default ProductsPage;
