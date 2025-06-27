import { Pencil, Trash } from "react-bootstrap-icons";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import type { Product } from "../../../models/Product";
import { ProductRepository } from "../../../repositories/ProductRepository";

type Props = {
  product: Product;
  onEditCallback(product: Product): void;
  onDeleteCallback(): void;
};
export const ProductInfo = ({
  product,
  onEditCallback,
  onDeleteCallback,
}: Props) => {
  const onProductEditClick = async () => {
    const productToEdit = await new ProductRepository().getProductById(
      product.id!
    );

    if (productToEdit === null) {
      return;
    }
    onEditCallback(productToEdit);
  };
  const onProductDeleteClick = async () => {
    await new ProductRepository().deleteProduct(product.id!);
    // await new NotificationsRepository().sendMessageToTopic(
    //   CONTACT_NOTIFICATION_TOPIC,
    //   "Product Delete",
    //   `Deleting product: ${product.name} ${product.lastName}`
    // );
    onDeleteCallback();
  };
  return (
    <Card className="my-3" title={`${product.name}`}>
      <div className="text-gray-700 mb-3">
        <div>
          {product.fileUrl && (
            <img
              src={product.fileUrl}
              alt={product.name}
              className="w-32 h-32 object-cover mb-2"
            />
          )}
        </div>
        <p>
          <strong>Price:</strong> {product.price} Bs
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <div className="mt-2">
          <Button onClick={onProductEditClick}>
            <Pencil size={12} />
          </Button>
          <Button
            onClick={onProductDeleteClick}
            className="ml-2"
            variant="danger"
          >
            <Trash size={12} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
