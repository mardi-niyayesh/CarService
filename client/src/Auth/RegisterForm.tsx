import { Link } from "react-router-dom";
import imgLogin from "../../assets/imglogin.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/api";
import {type FormData } from "../types/auth.types";


  const RegisterForm = () => {

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
    } = useForm<FormData>({
      mode: "onChange", 
      defaultValues: {
        email: "",
        password: "",
        firstname: "",
        age: undefined,
        rules: false,
      },
    });

    // mutation 
    const mutation = useMutation({
      mutationFn: registerUser,
      onSuccess: (data) => {
        console.log("ثبت‌نام موفق:", data);
        alert("ثبت‌نام با موفقیت انجام شد!");
        reset();
      },
      onError: (error: Error) => {
        console.error("خطا در ثبت‌نام:", error);
        alert(error.message || "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
      },
    });

    const onSubmit = (data: FormData) => {
      console.log("داده‌های فرم:", data);
      mutation.mutate(data);
    };

    // pattern Email
    const emailPattern =
      /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
    // pattern Password
    const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl mt-10 overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 text-center">
              ثبت نام
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  ایمیل :
                </label>
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  {...register("email", {
                    required: "ایمیل نمی‌تواند خالی باشد",
                    pattern: {
                      value: emailPattern,
                      message: "ایمیل وارد شده معتبر نمی‌باشد",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  پس ورد :
                </label>
                <input
                  type="password"
                  placeholder="پس ورد خود را وارد کنید"
                  {...register("password", {
                    required: "پس ورد نمی تواند خالی باشد",
                    minLength: {
                      value: 6,
                      message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                    },
                    maxLength: {
                      value: 20,
                      message: "رمز عبور باید حداکثر ۲۰ کاراکتر باشد",
                    },
                    pattern: {
                      value: patternPassword,
                      message: "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  نام :
                </label>
                <input
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  {...register("firstname", {
                    minLength: {
                      value: 3,
                      message: "نام کاربری باید حداقل ۳ کاراکتر باشد",
                    },
                    maxLength: {
                      value: 40,
                      message: "نام کاربری باید حداکثر ۴۰ کاراکتر باشد",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition ${
                    errors.firstname
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                {errors.firstname && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    {errors.firstname.message}
                  </p>
                )}
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  سن :
                </label>
                <input
                  type="number"
                  placeholder="سن خود را وارد کنید"
                  {...register("age", {
                    minLength: {
                      value: 0,
                      message: "سن حدالقل صفر سال است",
                    },
                    maxLength: {
                      value: 120,
                      message: "سن حداکثر ۱۲۰ سال است",
                    },
                    valueAsNumber: true,
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition ${
                    errors.age ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.age && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  {errors.age.message}
                </p>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rules"
                  {...register("rules", {
                    required: "برای ثبت‌ نام باید با قوانین موافقت کنید",
                  })}
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
              {errors.rules && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rules.message}
                </p>
              )}

              {mutation.isPending && (
                <div className="text-blue-500 text-sm text-center">
                  در حال ارسال اطلاعات...
                </div>
              )}

              {mutation.isError && (
                <div className="text-red-500 text-sm text-center">
                  خطا در ارسال. لطفاً دوباره تلاش کنید.
                </div>
              )}

              {mutation.isSuccess && (
                <div className="text-green-500 text-sm text-center">
                  ثبت‌نام با موفقیت انجام شد!
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || mutation.isPending}
                className={`w-full font-medium py-2.5 rounded-lg transition duration-300 ${
                  isValid && !mutation.isPending
                    ? "bg-blue-600 ..."
                    : "bg-gray-300 ..."
                }`}
              >
                {mutation.isPending ? "در حال ثبت‌نام..." : "ثبت‌نام"}
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
