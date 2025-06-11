import type { ContactType } from "./ContactType";

export interface Contact {
  id?: string;
  type: ContactType;
  detail: string;
  name: string;
  lastName: string;
}
