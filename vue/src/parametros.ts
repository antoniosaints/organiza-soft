type IparamsQuote = {
  users: number;
  signatures: number;
  products: number;
  services: number;
  sales: number;
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
      users: 5,
      signatures: 50,
      products: 10,
      services: 10,
      sales: 100,
    },
    pro: {
      users: 0,
      signatures: 0,
      products: 0,
      services: 0,
      sales: 0,
    },
  },
};
