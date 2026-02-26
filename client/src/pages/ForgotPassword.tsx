//components
import AuthForm from "../components/common/AuthForm";
import SuccessModal from "../components/common/SuccessModal";
import ErrorModal from "../components/common/ErrorModal";
//api
import { forgotPassword } from "../services/api";
//hook
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  //SuccessModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //ErrorModal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useMutation({
    mutationFn: (data: { email: string }) => forgotPassword(data.email),
    onSuccess: (data) => {
      console.log("success", data);
      setModalMessage(
        "لینک بازیابی رمز عبور با موفقیت برای ایمیل شما ارسال شد",
      );
      setIsModalOpen(true);
    },
    onError: (error: Error) => {
      console.error("خطا:", error);
      setErrorMessage(
        "خطایی در ارسال لینک بازیابی رخ داد لطفا ایمیل خود را مجدد وارد کنید",
      );
      setIsErrorModalOpen(true);
    },
  });

  const handleSubmit = (data: { email: string }) => {
    mutation.mutate(data);
  };
  //SuccessModal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/reset-password");
  };
  //SuccessModal
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  return (
    <>
      <AuthForm
        type="forgot-password"
        onSubmit={handleSubmit}
        isPending={mutation.isPending}
        error={mutation.error?.message}
        successMessage={
          mutation.isSuccess
            ? mutation.data?.message ||
              "لینک بازیابی رمز عبور به ایمیل شما ارسال شد"
            : null
        }
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
};

export default ForgotPassword;
