
export const LogoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
       credentials: "include"
    });
    if (!response.ok) {
      console.log("statuse", response.status);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    const data = await response.json();
    console.log("داده دریافتی از سرور", data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
