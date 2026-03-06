export type Coupon = {
  id: string;
  amount: number;
  title: string;
  condition: string;
  expireDate: string;
  claimed: boolean;
};

export type StoreInfo = {
  name: string;
  address: string;
};
