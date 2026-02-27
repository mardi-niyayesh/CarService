//components
import DashboardSidebar from "../Components/DashboardSidebar";
//hooks
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//api
import { LogoutUser } from "../Api/DashboardApi";
//Modal
import SuccessModal from "../../components/common/SuccessModal";
import ErrorModal from "../../components/common/ErrorModal";

const LogoutPage = () => {
  const navigate = useNavigate();
  //SuccessModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //ErrorModal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //state loading
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    // start=>close modal
    setIsModalOpen(false);
    setIsErrorModalOpen(false);

    try {
      const result = await LogoutUser();
      // console.log("نتیجه خروج", result);

      if (!result) {
        // console.log("ریزالت نداره");
        setErrorMessage("پاسخی از سرور دریافت نشد");
        setIsErrorModalOpen(true);
        setIsLoading(false);
        return;
      }

      // success logout
      if (result.success === true) {
        setModalMessage("شما با موفقیت از حساب کاربری خود خارج شدید");
        setIsModalOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      // error 401
      else if (result.statusCode === 401) {
        console.log("status: 401");
        if (result.message?.includes("expired refresh token")) {
          setErrorMessage("نشست شما منقضی شده است لطفا دوباره وارد سیستم شوید");
        } else {
          setErrorMessage("شما وارد سیستم نشده اید. ابتدا وارد سیستم شوید");
        }
        setIsErrorModalOpen(true);
        localStorage.clear();

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      // error 403
      else if (result.statusCode === 403) {
        console.log("status: 403");
        if (result.message?.includes("Refresh token already revoked")) {
          setErrorMessage("نشست شما قبلا باطل شده است لطفا مجدد وارد شوید");
        } else {
          setErrorMessage("شما دسترسی به این عملیات را ندارید");
        }
        setIsErrorModalOpen(true);
        localStorage.clear();

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.log("خطا :", err);
      setErrorMessage("خطا در برقراری ارتباط با سرور. لطفا مجدد تلاش کنید");
      setIsErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-gray-50"
      dir="rtl"
    >
      {/* components DashboardSidebar */}
      <div className="md:w-64 lg:w-72 flex-shrink-0">
        <DashboardSidebar />
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-8">
        {/* title Pages*/}
        <div className="mb-6 md:mb-8">
          <p className="text-[#212121] text-xl sm:text-2xl md:text-3xl font-bold pb-3 inline-block">
            خروج
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto md:mx-0">
          {/* Approval Question*/}
          <div className="text-[#212121] sm:text-lg md:text-xl font-medium text-center mb-8">
            برای خروج از حساب کاربری خود اطمینان دارید؟
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Cancel Button*/}
            <Link to="/dashboard">
              <button className="text-[#DB1D27] border-2 border-[#DB1D27] px-6 sm:px-8 py-3 rounded-xl hover:text-white hover:bg-[#DB1D27] transition-all duration-300 font-medium text-sm sm:text-base w-full sm:w-auto">
                انصراف
              </button>
            </Link>
            {/* logout Button*/}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`text-white bg-[#DB1D27] border-2 border-[#DB1D27] px-6 sm:px-8 py-3 rounded-xl hover:bg-white hover:text-[#DB1D27] transition-all duration-300 font-medium text-sm sm:text-base w-full sm:w-auto ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "در حال خروج..." : "خروج از حساب"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <SuccessModal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => {
            setIsModalOpen(false);
            navigate("/login");
          }}
        />
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <ErrorModal
          isOpen={isErrorModalOpen}
          message={errorMessage}
          onClose={() => {
            setIsErrorModalOpen(false);
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default LogoutPage;
