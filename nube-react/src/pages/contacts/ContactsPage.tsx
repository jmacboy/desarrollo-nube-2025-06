import { Container } from "../../components/Container";
import type { Contact } from "../models/Contact";
import Menu from "../../components/Menu";
import Button from "../../components/Button";
import { ContactDialog } from "./ContactDialog";
import { ContactList } from "./ContactList";
import { useState } from "react";
import { ContactContext } from "./ContactContext";

const ContactsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);
  const onAddContactClick = () => {
    setContactToEdit(null);
    setIsDialogOpen(true);
  };
  return (
    <>
      <Menu />
      <ContactContext.Provider
        value={{
          reloadFlag,
          setReloadFlag,
          isDialogOpen,
          setIsDialogOpen,
          contactToEdit,
          setContactToEdit,
        }}
      >
        <Container>
          <div className="flex justify-between items-center mb-4 mt-4">
            <h1 className="text-2xl mt-2 mb-2">Contacts</h1>
            <Button onClick={onAddContactClick}>Add contact</Button>
          </div>
          <ContactList />
        </Container>
        <ContactDialog />
      </ContactContext.Provider>
    </>
  );
};

export default ContactsPage;
