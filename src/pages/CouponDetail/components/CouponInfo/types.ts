export type CouponInfoProps = {
  category: string;
  title: string;
  description: string;
  validPeriod: string;
  onUse: () => void;
  onShare: () => void;
};
