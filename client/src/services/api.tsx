import { type FormData } from "../types/auth.types";
import { type LoginFormData } from "../types/auth.types";

export const registerUser = async (userData: FormData) => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("خطا در ثبت‌نام");
  }

  return await response.json();
};

export const loginUser = async (userData: LoginFormData) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("خطا در ورود");
  }

  return await response.json();
};
