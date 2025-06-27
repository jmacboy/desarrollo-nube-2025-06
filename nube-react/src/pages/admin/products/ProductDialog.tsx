import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../../components/Button";
import { Dialog } from "../../../components/Dialog";
import { Input } from "../../../components/Input";
import { useContext, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { ProductRepository } from "../../../repositories/ProductRepository";
import FileInput from "../../../components/FileInput";
import type { Product } from "../../../models/Product";

type Inputs = {
  name: string;
  description: string;
  image: FileList | null;
  price: number;
};
export const ProductDialog = () => {
  const {
    productToEdit,
    isDialogOpen,
    setIsDialogOpen,
    setReloadFlag,
    reloadFlag,
  } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (productToEdit && isDialogOpen) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
      });
    }
  }, [productToEdit, isDialogOpen, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (productToEdit) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
  };
  const updateProduct = async (data: Inputs) => {
    const productRepository = new ProductRepository();
    const slug = await productRepository.createProductSlug(
      data.name,
      productToEdit?.id
    );
    const productParam: Product = {
      id: productToEdit?.id,
      name: data.name,
      price: data.price,
      description: data.description,
      slug,
    };
    if (productToEdit?.fileUrl) {
      productParam.fileUrl = productToEdit.fileUrl;
    }
    const updatedProduct = await productRepository.updateProduct(productParam);
    // await new NotificationsRepository().sendMessageToTopic(
    //   CONTACT_NOTIFICATION_TOPIC,
    //   "Product Edit",
    //   `Editing product: ${data.name} ${data.lastName}`
    // );
    const file = data.image?.[0];
    if (file) {
      const fileResult = await productRepository.uploadProductImage(
        updatedProduct.id!,
        file
      );
      console.log("Product image uploaded successfully:", fileResult);
      updatedProduct.fileUrl = fileResult.downloadUrl;
      await new ProductRepository().updateProduct(updatedProduct);
    }
    console.log("Product updated:", updatedProduct);
    setIsDialogOpen(false);
    setReloadFlag(reloadFlag + 1);
    reset();
  };
  const addProduct = async (data: Inputs) => {
    const productRepository = new ProductRepository();
    const slug = await productRepository.createProductSlug(data.name);
    const submittedProduct = await productRepository.addProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      slug,
    });

    const file = data.image?.[0];
    if (file) {
      const fileResult = await productRepository.uploadProductImage(
        submittedProduct.id!,
        file
      );
      console.log("Product image uploaded successfully:", fileResult);
      submittedProduct.fileUrl = fileResult.downloadUrl;
      await new ProductRepository().updateProduct(submittedProduct);
    }

    // await new NotificationsRepository().sendMessageToTopic(
    //   CONTACT_NOTIFICATION_TOPIC,
    //   "Product added",
    //   `Added product: ${data.name} ${data.lastName}`
    // );
    console.log("Product added:", submittedProduct);
    setIsDialogOpen(false);
    setReloadFlag(reloadFlag + 1);
    reset();
  };
  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          type="text"
          error={errors.name ? "This field is required" : ""}
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", { required: true })}
        />
        <Input
          label="Description"
          error={errors.description ? "This field is required" : ""}
          type="text"
          aria-invalid={errors.description ? "true" : "false"}
          {...register("description", { required: true })}
        />
        <Input
          label="Price"
          type="number"
          error={errors.price ? "This field is required" : ""}
          {...register("price", { required: true })}
        />
        <FileInput
          label="Select Product Image"
          type="file"
          aria-invalid={errors.image ? "true" : "false"}
          {...register("image")}
        />
        <div className="mt-4">
          <Button variant="primary" type="submit">
            Save Product
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
