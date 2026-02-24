import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "./services/index";
import SignupPage from "./SignupPage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const { mutate: sendLoginDetails } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    sendLoginDetails(data, {
      onSuccess: (response) => {
        login(response);
        localStorage.setItem("loginTimestamp", Date.now());
        localStorage.setItem("token", "userLoggedIn");

        toast.success("Logged in successfully!");
        reset();
        setIsSubmitting(false);
        navigate("/dashboard", { replace: true });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Invalid Email or Password",
        );
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      <div className="py-12 lg:py-20 flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-black text-center mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please enter your credentials to continue
          </p>

          {/* Email */}
          <label className="block mb-1 text-gray-700 font-medium">
            Email ID
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            {...register("loginId", {
              required: "Login ID is required",
            })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.loginId && (
            <p className="text-red-500 text-sm">{errors.loginId.message}</p>
          )}

          {/* Password */}
          <label className="block mt-4 mb-1 text-gray-700 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length === 0) return "Password cannot be empty";
                  if (trimmed.length < 6) return "Minimum 6 characters";
                  return true;
                },
              })}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-black"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}

          {/* Set Password */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-4 text-sm text-gray-500 hover:text-black underline"
          >
            Set Password
          </button>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 mt-6 px-4 py-2 rounded-lg text-lg font-medium transition ${
              isSubmitting
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="loader"></span> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* Signup Modal */}
      <SignupPage isOpen={isOpen} setIsOpen={setIsOpen} />

      <style>{`
        .loader {
          border: 3px solid #e5e5e5;
          border-top: 3px solid #000;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Login;

//! black and white version
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";
// import { useLogin } from "./services/index";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { login } = useAuth();
//   const { mutate: sendLoginDetails } = useLogin();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     setIsSubmitting(true);

//     sendLoginDetails(data, {
//       onSuccess: (response) => {
//         login(response);
//         localStorage.setItem("loginTimestamp", Date.now());
//         console.log(response);
//         toast.success("Logged in successfully!");
//         localStorage.setItem("token", "userLoggedIn");

//         reset();
//         setIsSubmitting(false);
//         navigate("/dashboard", { replace: true });

//         // Optional redirect
//         // window.location.href = "/dashboard";
//       },
//       onError: (error) => {
//         toast.error(
//           error?.response?.data?.message || "Invalid Email or Password",
//         );
//         setIsSubmitting(false);
//       },
//     });
//   };

//   return (
//     <>
//       <div className=" py-12 lg:py-24 flex items-center justify-center bg-gray-100 px-4">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border"
//         >
//           <h2 className="text-3xl font-bold text-black text-center mb-2">
//             Admin Login
//           </h2>
//           <p className="text-gray-500 text-center mb-6">
//             Please enter your credentials to continue
//           </p>

//           {/* Email */}
//           <label className="block mb-1 text-gray-700 font-medium">
//             Email ID
//           </label>
//           <input
//             type="text"
//             placeholder="Enter your email"
//             {...register("loginId", {
//               required: "Login ID is required",
//             })}
//             className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
//           />
//           {errors.loginId && (
//             <p className="text-red-500 text-sm mb-2">
//               {errors.loginId.message}
//             </p>
//           )}

//           {/* Password */}
//           <label className="block mt-4 mb-1 text-gray-700 font-medium">
//             Password
//           </label>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               {...register("password", {
//                 required: "Password is required",
//                 validate: (value) => {
//                   const trimmed = value.trim();
//                   if (trimmed.length === 0) return "Password cannot be empty";
//                   if (trimmed.length < 6) return "Minimum 6 characters";
//                   return true;
//                 },
//               })}
//               className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2 text-gray-500 hover:text-black"
//               tabIndex={-1}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           </div>

//           {errors.password && (
//             <p className="text-red-500 text-sm mt-2">
//               {errors.password.message}
//             </p>
//           )}

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full flex items-center justify-center gap-2 mt-6 px-4 py-2 rounded-lg text-lg font-medium transition ${
//               isSubmitting
//                 ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 : "bg-black text-white hover:bg-gray-800"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="loader"></span> Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>
//       </div>

//       {/* Loader CSS */}
//       <style>{`
//       .loader {
//         border: 3px solid #e5e5e5;
//         border-top: 3px solid #000;
//         border-radius: 50%;
//         width: 16px;
//         height: 16px;
//         animation: spin 0.6s linear infinite;
//       }

//       @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//       }
//     `}</style>
//     </>
//   );
// };

// export default Login;
//! orange version
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";
// import { useLogin } from "./services/index";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { login } = useAuth();
//   const { mutate: sendLoginDetails } = useLogin();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     setIsSubmitting(true);

//     sendLoginDetails(data, {
//       onSuccess: (response) => {
//         login(response);
//         localStorage.setItem("loginTimestamp", Date.now());
//         console.log(response);
//         toast.success("Logged in successfully!");
//         localStorage.setItem("token", "userLoggedIn");

//         reset();
//         setIsSubmitting(false);
//         navigate("/dashboard", { replace: true });

//         // Optional redirect
//         // window.location.href = "/dashboard";
//       },
//       onError: (error) => {
//         toast.error(
//           error?.response?.data?.message || "Invalid Email or Password",
//         );
//         setIsSubmitting(false);
//       },
//     });
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center p-6 min-h-screen bg-[#F8F9FB]">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
//         >
//           <h2 className="text-2xl font-bold text-orange-600 mb-2">Login</h2>
//           <p className="text-gray-600 mb-4">
//             Enter your login credentials to access your account.
//           </p>

//           {/* Email */}
//           <label className="block mb-1 text-gray-700 font-medium">
//             Email ID
//           </label>
//           <input
//             type="text"
//             placeholder="Enter your email ID"
//             {...register("loginId", {
//               required: "Login ID is required",
//             })}
//             className="w-full mb-3 px-3 py-2 border border-orange-300 rounded focus:ring-2 outline-none focus:ring-orange-300"
//           />
//           {errors.loginId && (
//             <p className="text-red-600 text-sm">{errors.loginId.message}</p>
//           )}

//           {/* Password */}
//           <label className="block mt-4 mb-1 text-gray-700 font-medium">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               {...register("password", {
//                 required: "Password is required",
//                 validate: (value) => {
//                   const trimmed = value.trim();
//                   if (trimmed.length === 0) return "Password cannot be empty";
//                   if (trimmed.length < 6) return "Minimum 6 characters";
//                   return true;
//                 },
//               })}
//               className="w-full px-3 py-2 pr-10 border border-orange-300 outline-none rounded focus:ring-2 focus:ring-orange-300"
//             />

//             {/* Eye Button */}
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-2 text-gray-600 hover:text-orange-500"
//               tabIndex={-1}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           </div>

//           {errors.password && (
//             <p className="text-red-600 text-sm mt-1">
//               {errors.password.message}
//             </p>
//           )}

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full flex items-center justify-center gap-2 mt-6 px-4 py-2 rounded text-lg transition ${
//               isSubmitting
//                 ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 : "bg-orange-300 text-black hover:bg-orange-400"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="loader"></span> Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>
//       </div>

//       {/* Loader CSS */}
//       <style>{`
//         .loader {
//           border: 3px solid #f3f3f3;
//           border-top: 3px solid #f97316;
//           border-radius: 50%;
//           width: 16px;
//           height: 16px;
//           animation: spin 0.6s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Login;
