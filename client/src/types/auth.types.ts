
// type for props components
 export type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: any;
  validation?: object;
};

//type for Register Form
export type RegisterFormData = {
  email: string;
  password: string;
  firstname: string;
  age: number;
  rules: boolean;
};

//type for Login Form
export type LoginFormData = {
  email: string;
  password: string;
};

//type props Modle
export type SuccessModalProps= {
  isOpen: boolean;
  onClose: () => void;  
  message: string;
}
//type AuthFormProps
 export type AuthFormProps = {
  type: "register" | "login";
  onSubmit: (data: any) => void;
  isPending?: boolean;
  error?: string | null;
  resetForm?: boolean;
};