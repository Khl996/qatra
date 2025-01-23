export interface Promotion {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  discountPercentage?: number;
  termsAndConditions?: string;
  maxUsage?: number;
}
