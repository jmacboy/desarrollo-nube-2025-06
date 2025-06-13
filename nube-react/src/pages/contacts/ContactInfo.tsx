import { Pencil, Trash } from "react-bootstrap-icons";
import Button from "../../components/Button";
import Card from "../../components/Card";
import type { Contact } from "../models/Contact";
import { ContactTypeStrings } from "../models/ContactType";
import { ContactRepository } from "../../repositories/ContactRepository";

type Props = {
  contact: Contact;
  onEditCallback(contact: Contact): void;
  onDeleteCallback(): void;
};
export const ContactInfo = ({
  contact,
  onEditCallback,
  onDeleteCallback,
}: Props) => {
  const onContactEditClick = async () => {
    const contactToEdit = await new ContactRepository().getContactById(
      contact.id!
    );
    if (contactToEdit === null) {
      return;
    }
    onEditCallback(contactToEdit);
  };
  const onContactDeleteClick = () => {
    new ContactRepository().deleteContact(contact.id!);
    onDeleteCallback();
  };
  return (
    <Card className="my-3" title={`${contact.name} ${contact.lastName}`}>
      <div className="text-gray-700 mb-3">
        <p>
          <strong>Type:</strong> {ContactTypeStrings[contact.type]}
        </p>
        <p>
          <strong>Detail:</strong> {contact.detail}
        </p>
        <div className="mt-2">
          <Button onClick={onContactEditClick}>
            <Pencil size={12} />
          </Button>
          <Button
            onClick={onContactDeleteClick}
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
