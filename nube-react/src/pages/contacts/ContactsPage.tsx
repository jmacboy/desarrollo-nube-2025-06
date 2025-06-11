import Card from "../../components/Card";
import { Container } from "../../components/Container";
import { useEffect, useState } from "react";
import { ContactRepository } from "../../repositories/ContactRepository";
import type { Contact } from "../models/Contact";
import { ContactTypeStrings } from "../models/ContactType";
import Menu from "../../components/Menu";
import Button from "../../components/Button";
import { ContactDialog } from "./ContactDialog";

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    loadContacts();
  }, []);
  const loadContacts = async () => {
    const theContacts = await new ContactRepository().getContacts();
    setContacts(theContacts);
  };
  return (
    <>
      <Menu />

      <Container>
        <div className="flex justify-between items-center mb-4 mt-4">
          <h1 className="text-2xl mt-2 mb-2">Contacts</h1>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Add contact
          </Button>
        </div>
        {contacts.map((contact) => (
          <Card
            className="my-3"
            title={`${contact.name} ${contact.lastName}`}
            key={contact.id}
          >
            <div className="text-gray-700 mb-3">
              <p>
                <strong>Type:</strong> {ContactTypeStrings[contact.type]}
              </p>
              <p>
                <strong>Detail:</strong> {contact.detail}
              </p>
            </div>
          </Card>
        ))}
      </Container>
      <ContactDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onContactAdded={() => {
          loadContacts();
        }}
      ></ContactDialog>
    </>
  );
};

export default ContactsPage;
