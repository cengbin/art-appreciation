export type CouponCardProps = {
  amount: number;
  title: string;
  condition: string;
  expireDate: string;
  claimed: boolean;
  onClaim: () => void;
};
