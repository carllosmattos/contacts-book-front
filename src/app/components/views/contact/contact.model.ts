export interface Contact {
  id?: string;
  tipo_contato: ContactType;
  valor: string;
}

export enum ContactType {
  EMAIL = "EMAIL",
  TELEFONE = "TELEFONE",
  CELULAR = "CELUALR",
}
