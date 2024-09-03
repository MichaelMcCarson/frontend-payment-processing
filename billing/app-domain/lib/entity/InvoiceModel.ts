export interface Invoice {
  id: string;
  amount: number;
  invoiceCycleEnd: Date;
}

export interface InvoiceEmailAndId {
  id: Invoice["id"];
  invoiceEmail: string;
}
