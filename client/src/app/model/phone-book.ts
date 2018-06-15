
export interface PhoneBook {
    error: number;
    phonebook?: (PhonebookEntity)[] | null;
  }
export interface PhonebookEntity {
    id?: number;
    firstName: string;
    lastName: string;
    number: string;
  }
