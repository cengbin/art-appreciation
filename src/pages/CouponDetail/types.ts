export type CouponDetail = {
  id: string;
  category: string;
  title: string;
  description: string;
  validPeriod: string;
  rules: string[];
  contactInfo?: string;
  availableStores: {
    distance: string;
  };
};
