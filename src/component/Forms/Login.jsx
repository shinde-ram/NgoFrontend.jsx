import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.accountAccess();
        console.log(response);
        if (response) {
          if (response.role === "user") {
            navigate(`/account/user/${response.id}`);
          } else if (response.role === "ngo") {
            navigate(`/account/ngo/${response.id}`);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const onSubmit = async (data) => {
    const { email, password, role } = data;

    try {
      const response = await axios.post(
        "http://localhost:8080/Profile/login",
        new URLSearchParams({
          email,
          password,
          role,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      console.log(response);  
      if (response.status) {
        console.log("Login successful wow:", response.data);
        const result = response.data;
        console.log(result);

        // Redirect based on role
        if (result.role === "user") {
          navigate(`/account/user/${result.id}`);
        } else if (result.role === "ngo") {
          navigate(`/account/ngo/${result.id}`);
        }
      } else {
        alert("Login failed: ");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-[90%] md:max-w-md bg-white shadow-lg rounded-lg p-6 opacity-90">
        {/* Cancel Button */}
        <div className="relative bottom-2 flex justify-end">
          <MdOutlineCancel
            className="text-red-600 h-8 w-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            >
              <option value="">Select your role</option>
              <option value="user">User</option>
              <option value="ngo">NGO</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-2 flex justify-center items-center">
          <span className="text-gray-400">or</span>
        </div>

        {/* Google Login Button */}
        <div className="mb-4">
          <button
            className="bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center w-full shadow-md hover:bg-blue-700 transition duration-200"
          >
            <FaGoogle className="mr-2 text-white" /> Sign in with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register/user"
            className="text-green-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
