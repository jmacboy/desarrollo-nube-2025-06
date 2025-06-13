import { createContext } from "react";
import type { Contact } from "../models/Contact";
type ContactContextType = {
  reloadFlag: number;
  setReloadFlag: (flag: number) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  contactToEdit: Contact | null;
  setContactToEdit: (contact: Contact) => void;
};
export const ContactContext = createContext<ContactContextType>({
  reloadFlag: 0,
  setReloadFlag: () => {},
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  contactToEdit: null,
  setContactToEdit: () => {},
});
