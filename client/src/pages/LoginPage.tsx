import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";
import { loginUser } from "../services/api";
import {type LoginFormData } from "../types/auth.types";

function LoginPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      alert("ورود موفقیت‌آمیز بود!");
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("خطا:", error);
    },
  });

  const handleLogin = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      isPending={mutation.isPending}
      error={mutation.error?.message}
    />
  );
}

export default LoginPage;
