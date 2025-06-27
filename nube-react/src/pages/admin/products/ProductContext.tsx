import { createContext } from "react";
import type { Product } from "../../../models/Product";
type ProductContextType = {
  reloadFlag: number;
  setReloadFlag: (flag: number) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  productToEdit: Product | null;
  setProductToEdit: (product: Product) => void;
};
export const ProductContext = createContext<ProductContextType>({
  reloadFlag: 0,
  setReloadFlag: () => {},
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  productToEdit: null,
  setProductToEdit: () => {},
});
