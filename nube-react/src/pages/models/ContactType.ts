import type { SelectOption } from "../../components/Select";

export const ContactType = {
  Email: 1,
  Phone: 2,
} as const;

export type ContactType = (typeof ContactType)[keyof typeof ContactType];
export const ContactTypeStrings: Record<ContactType, string> = {
  [ContactType.Email]: "Email",
  [ContactType.Phone]: "Phone",
};
export const ContactTypeOptions: SelectOption[] = [
  {
    value: ContactType.Email,
    label: ContactTypeStrings[ContactType.Email],
  },
  {
    value: ContactType.Phone,
    label: ContactTypeStrings[ContactType.Phone],
  },
];
