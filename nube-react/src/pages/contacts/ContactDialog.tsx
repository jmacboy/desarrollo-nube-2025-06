import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import { Dialog } from "../../components/Dialog";
import { Input } from "../../components/Input";
import { ContactType, ContactTypeOptions } from "../models/ContactType";
import { ContactRepository } from "../../repositories/ContactRepository";
import type { Contact } from "../models/Contact";
import { Select } from "../../components/Select";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onContactAdded: (contact: Contact) => void;
};
type Inputs = {
  name: string;
  lastName: string;
  type: number;
  detail: string;
};
export const ContactDialog = ({ isOpen, setIsOpen, onContactAdded }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const contact = await new ContactRepository().addContact({
      name: data.name,
      lastName: data.lastName,
      type: data.type as ContactType,
      detail: data.detail,
    });
    console.log("Contact added:", contact);
    setIsOpen(false);
    onContactAdded(contact);
    reset();
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
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
