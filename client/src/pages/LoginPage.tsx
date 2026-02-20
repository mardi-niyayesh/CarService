import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";
import { loginUser } from "../services/api";
import { type LoginFormData } from "../types/auth.types";
import SuccessModal from "../components/common/SuccessModal";
import ErrorModal from "../components/common/ErrorModal";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  //SuccessModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //ErrorModal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data?.response?.data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
        setModalMessage(
          "ورود شما با موفقیت انجام شد! به خانواده کارسرویس خوش آمدید.",
        );
        setIsModalOpen(true);
      } else {
        console.error("توکن یافت نشد. ساختار پاسخ:", data);
        setErrorMessage(
           "خطایی در ورود رخ داد. لطفاً مجدداً تلاش کنید.",
        );
        setIsErrorModalOpen(true);
      }
    },
    onError: (error: Error) => {
      console.error("خطا:", error);
      setErrorMessage(
        error.message || "خطایی در ورود رخ داد. لطفاً مجدداً تلاش کنید.",
      );
      setIsErrorModalOpen(true);
    },
  });

  const handleLogin = (data: LoginFormData) => {
    mutation.mutate(data);
  };
  //SuccessModal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  //SuccessModal
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <>
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        isPending={mutation.isPending}
        error={mutation.error?.message}
      />
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </>
  );
}

export default LoginPage;
