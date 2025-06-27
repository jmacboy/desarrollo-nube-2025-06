import type { Product } from "../../../models/Product";

type Props = {
  product: Product;
};
export const ProductDetail = ({ product }: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.fileUrl} alt={product.name} className="w-1/2 h-auto" />
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 text-xl font-semibold">${product.price}</p>
    </div>
  );
};
