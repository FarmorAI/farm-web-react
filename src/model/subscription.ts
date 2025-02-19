export interface SubscriptionPlan {
   title: string;
   price: number;
   features: string[];
}

export interface PaymentFormProps {
   selectedPlan: string;
   selectedPrice: number;
   termsChecked: boolean;
   privacyChecked: boolean;
   onTermsChange: (checked: boolean) => void;
   onPrivacyChange: (checked: boolean) => void;
   onPayment: () => void;
}

export interface SubscriptionCardProps {
   plan: SubscriptionPlan;
   isSelected: boolean;
   onSelect: (title: string, price: number) => void;
}