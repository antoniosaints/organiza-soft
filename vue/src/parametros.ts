type IparamsQuote = {
  price: number;
  users: number;
  signatures: number;
  products: number;
  services: number;
  sales: number;
  suport: string;
  ai: boolean;
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
      users: 2,
      signatures: 10,
      products: 5,
      services: 5,
      sales: 50,
      ai: false,
      suport: "Suporte pelo site",
    },
    pro: {
      price: 19.9,
      users: 0,
      signatures: 0,
      products: 0,
      services: 0,
      sales: 0,
      ai: true,
      suport: "Suporte por whatsapp",
    },
  },
};
