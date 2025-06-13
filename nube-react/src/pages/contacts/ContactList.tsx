import { useCallback, useContext, useEffect, useState } from "react";
import type { Contact } from "../models/Contact";
import { ContactInfo } from "./ContactInfo";
import { ContactRepository } from "../../repositories/ContactRepository";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { ContactContext } from "./ContactContext";

export const ContactList = () => {
  const { user } = useFirebaseUser();
  const { reloadFlag, setReloadFlag, setContactToEdit, setIsDialogOpen } =
    useContext(ContactContext);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = useCallback(async () => {
    const theContacts = await new ContactRepository().getContactsByOwnerId(
      user!.uid
    );
    setContacts(theContacts);
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    loadContacts();
  }, [user, loadContacts, reloadFlag]);
  const onContactEditCallback = (contact: Contact) => {
    setContactToEdit(contact);
    setIsDialogOpen(true);
  };
  const onContactDeleteCallback = () => {
    setReloadFlag(reloadFlag + 1);
  };
  return (
    <>
      {contacts.map((contact) => (
        <ContactInfo
          contact={contact}
          key={contact.id}
          onEditCallback={onContactEditCallback}
          onDeleteCallback={onContactDeleteCallback}
        />
      ))}
    </>
  );
};
