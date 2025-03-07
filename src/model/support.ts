export interface FormData {
   inquiryType: string;
   title: string;
   content: string;
   agree: boolean;
}

export interface InquiryFormProps {
   formData: FormData;
   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export interface PrivacyProps {
   formData: FormData;
   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
