//components
import DashboardSidebar from "../Components/DashboardSidebar";

const LogoutPage = () => {
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
          <div className="text-[#212121]  sm:text-lg md:text-xl font-medium text-center mb-8">
            برای خروج از حساب کاربری خود اطمینان دارید؟
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Cancel  Button*/}
            <button className="text-[#DB1D27] border-2 border-[#DB1D27] px-6 sm:px-8 py-3 rounded-xl hover:text-white hover:bg-[#DB1D27] transition-all duration-300 font-medium text-sm sm:text-base w-full sm:w-auto">
              انصراف
            </button>

            {/*  Logout Button*/}
            <button className="text-white bg-[#DB1D27] border-2 border-[#DB1D27] px-6 sm:px-8 py-3 rounded-xl hover:bg-white hover:text-[#DB1D27] transition-all duration-300 font-medium text-sm sm:text-base w-full sm:w-auto">
              خروج از حساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
