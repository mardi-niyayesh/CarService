import { type FormData } from "../types/auth.types";

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
