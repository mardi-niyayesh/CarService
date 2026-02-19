import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";
import {type RegisterFormData } from "../types/auth.types";
import { registerUser } from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();


  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("ثبت‌ نام با موفقیت انجام شد!");
      navigate("/login");
    },
    onError: (error: Error) => {
      console.error("خطا:", error);
    },
  });

  
  const handleRegister = (data: RegisterFormData) => {
    mutation.mutate(data); 
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      isPending={mutation.isPending}
      error={mutation.error?.message}
    />
  );
}

export default RegisterPage;
