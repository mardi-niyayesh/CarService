import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";
import { type RegisterFormData } from "../types/auth.types";
import { registerUser } from "../services/api";
import SuccessModal from "../components/common/SuccessModal";
import ErrorModal from "../components/common/ErrorModal";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  //SuccessModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //ErrorModal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setModalMessage(
        "ثبت‌نام شما با موفقیت انجام شد! به خانواده کارسرویس خوش آمدید.",
      );
      setIsModalOpen(true);
 
    },
    onError: (error: Error) => {
      console.error("خطا:", error);
      setErrorMessage(
        error.message || "خطایی در ثبت‌نام رخ داد. لطفاً مجدداً تلاش کنید.",
      );
      setIsErrorModalOpen(true);
    },
  });

  const handleRegister = (data: RegisterFormData) => {
    mutation.mutate(data);
  };
  //SuccessModal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/login")
  };
  //SuccessModal
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <>
      <AuthForm
        type="register"
        onSubmit={handleRegister}
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

export default RegisterPage;
