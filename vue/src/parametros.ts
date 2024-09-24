type IparamsQuote = {
  price: number;
  users: number;
  signatures: number;
  products: number;
  services: number;
  sales: number;
  suport: string;
};
type IPlanQuota = {
  free: IparamsQuote;
  pro: IparamsQuote;
};
type IPamans = {
    quota: IPlanQuota;
}
export const systemParamsAccount: IPamans = {
  quota: {
    free: {
      price: 0,
      users: 5,
      signatures: 50,
      products: 10,
      services: 10,
      sales: 100,
      suport: "Suporte pelo site",
    },
    pro: {
      price: 19.9,
      users: 0,
      signatures: 0,
      products: 0,
      services: 0,
      sales: 0,
      suport: "Suporte por whatsapp",
    },
  },
};
