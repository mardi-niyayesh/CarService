import { type RegisterFormData } from "../types/auth.types";
import { type LoginFormData } from "../types/auth.types";
import { type resetPasswordtype } from "../types/auth.types";

export const registerUser = async (userData: RegisterFormData) => {
  try {
    //  console.log('. داده ارسالی به سرور:', userData);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    //  console.log('. وضعیت پاسخ:', response.status);
    const data = await response.json();
    // console.log('. داده دریافتی از سرور:', data);
    return data;
  } catch (error) {
    console.error("خطا در درخواست:", error);
    throw error;
  }
};

export const loginUser = async (userData: LoginFormData) => {
  try {
    // console.log('. داده ارسالی به سرور:', userData);

    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    // console.log('. وضعیت پاسخ:', response.status);

    const data = await response.json();
    // console.log('. داده دریافتی از سرور:', data);

    return data;
  } catch (error) {
    console.error("خطا در درخواست:", error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch("/api/auth/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log(". داده دریافتی از سرور:", data);
    return data;
  } catch (error) {
    console.error("خطا در درخواست:", error);
    throw error;
  }
};

export const resetPassword = async ({ password, token }: resetPasswordtype) => {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log("خطا در تنظیم مجدد رمز عبور");
    }
    return data;
  } catch (err) {
    console.log("خطا در تنظیم مجدد رمز عبور");
    return err;
  }
};
