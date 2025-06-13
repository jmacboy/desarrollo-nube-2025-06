import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import { Dialog } from "../../components/Dialog";
import { Input } from "../../components/Input";
import { ContactType, ContactTypeOptions } from "../models/ContactType";
import { ContactRepository } from "../../repositories/ContactRepository";
import { Select } from "../../components/Select";
import { useContext, useEffect } from "react";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { ContactContext } from "./ContactContext";

type Inputs = {
  name: string;
  lastName: string;
  type: number;
  detail: string;
};
export const ContactDialog = () => {
  const {
    contactToEdit,
    isDialogOpen,
    setIsDialogOpen,
    setReloadFlag,
    reloadFlag,
  } = useContext(ContactContext);
  const { user } = useFirebaseUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (contactToEdit && isDialogOpen) {
      reset({
        name: contactToEdit.name,
        lastName: contactToEdit.lastName,
        type: contactToEdit.type,
        detail: contactToEdit.detail,
      });
    } else {
      reset({
        name: "",
        lastName: "",
        type: ContactType.Email,
        detail: "",
      });
    }
  }, [contactToEdit, isDialogOpen, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (contactToEdit) {
      updateContact(data);
    } else {
      addContact(data);
    }
  };
  const updateContact = async (data: Inputs) => {
    const updatedContact = await new ContactRepository().updateContact({
      id: contactToEdit?.id,
      name: data.name,
      lastName: data.lastName,
      type: data.type as ContactType,
      detail: data.detail,
      ownerId: user!.uid,
    });
    console.log("Contact updated:", updatedContact);
    setIsDialogOpen(false);
    setReloadFlag(reloadFlag + 1);
    reset();
  };
  const addContact = async (data: Inputs) => {
    const submittedContact = await new ContactRepository().addContact({
      name: data.name,
      lastName: data.lastName,
      type: data.type as ContactType,
      detail: data.detail,
      ownerId: user!.uid,
    });
    console.log("Contact added:", submittedContact);
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
          label="Last Name"
          error={errors.lastName ? "This field is required" : ""}
          type="text"
          aria-invalid={errors.lastName ? "true" : "false"}
          {...register("lastName", { required: true })}
        />
        <Input
          label="Detail"
          type="text"
          error={errors.detail ? "This field is required" : ""}
          {...register("detail", { required: true })}
        />

        <Select
          label="Type"
          error={errors.type ? "This field is required" : ""}
          placeholder="Select contact type"
          aria-invalid={errors.type ? "true" : "false"}
          {...register("type", { required: true })}
          options={ContactTypeOptions}
        />
        <div className="mt-4">
          <Button variant="primary" type="submit">
            Save Contact
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
