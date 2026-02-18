import { Link } from "react-router-dom";
import imgLogin from "../../assets/imglogin.png";
import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [erroremail, setErroremail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [firstname, setFirstname] = useState("");

  // pattern Email
  const emailPattern =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

  // validate Email
  const validateEmail = (value: string) => {
    setEmail(value);
    if (!value) {
      setErroremail("ایمیل نمی تواند خالی باشد :))");
    } else if (!emailPattern.test(value)) {
      setErroremail("ایمیل وارد شده معتبر نمی باشد !");
    } else {
      setErroremail("");
    }
  };
  // pattern Password
  const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

  // validate Password
  const validatePassword = (value: string) => {
    setPassword(value);
    if (!value) {
      setErrorPassword("رمز عبور نمی تواند خالی باشد");
    } else if (value.length < 6) {
      setErrorPassword("رمز عبور باید حداقل 6 کاراکتر باشد");
    } else if (value.length > 20) {
      setErrorPassword("رمز عبور باید حداکثر 20 کاراکتر باشد");
    } else if (!patternPassword.test(value)) {
      setErrorPassword("رمز عبور باید شامل حداقل یک حرف و یک عدد باشد");
    } else {
      setErrorPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl mt-10 overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 text-center">
            ثبت نام
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                ایمیل :
              </label>
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                onChange={(e) => validateEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition ${
                  erroremail ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
            </div>
            {erroremail && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                {erroremail}
              </p>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                پس ورد :
              </label>
              <input
                type="password"
                onChange={(e) => validatePassword(e.target.value)}
                placeholder="پس ورد خود را وارد کنید"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition ${
                  errorPassword ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
            </div>
            {errorPassword && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                {errorPassword}
              </p>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                نام :
              </label>
              <input
                type="text"
                placeholder="نام خود را وارد کنید"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                سن :
              </label>
              <input
                type="number"
                placeholder="سن خود را وارد کنید"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rules"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rules" className="text-sm text-gray-600">
                با
                <Link
                  to="/rules"
                  className="mx-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  قوانین و مقررات سایت
                </Link>
                موافقت می‌کنم
              </label>
            </div>

            <button
              type="submit"
              disabled={!!erroremail || !email}
              className={`w-full font-medium py-2.5 rounded-lg transition duration-300 ${
                !erroremail && email && password && !errorPassword
                  ? "bg-blue-600 ..."
                  : "bg-gray-300 ..."
              }`}
            >
              ثبت‌نام
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              قبلاً ثبت‌نام کرده‌اید؟
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium mr-1"
              >
                وارد شوید
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-br  p-8 flex items-center justify-center">
          <img
            src={imgLogin}
            alt="imgLogin"
            className="w-full h-auto max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
