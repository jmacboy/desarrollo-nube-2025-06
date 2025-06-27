import { useNavigate } from "react-router";
import type { Product } from "../../../models/Product";

type Props = {
  product: Product;
};
export const ProductItem = ({ product }: Props) => {
  const navigate = useNavigate();
  const onProductItemClick = () => {
    navigate(`/products/${product.slug}`);
  };
  return (
    <div
      onClick={onProductItemClick}
      key={product.id}
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={product.fileUrl}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h5 className="text-lg font-semibold text-gray-800">{product.name}</h5>
      <p className="text-lg font-bold text-gray-900">${product.price}</p>
    </div>
  );
};
