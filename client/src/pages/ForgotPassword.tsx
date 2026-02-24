import AuthForm from "../components/common/AuthForm";
import { forgotPassword } from "../services/api";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (data: { email: string }) => forgotPassword(data.email),
    onSuccess: (data) => {
      console.log("success", data);
    },
  });

  const handleSubmit = (data: { email: string }) => {
    mutation.mutate(data);
  };

  return (
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
  );
};

export default ForgotPassword;
