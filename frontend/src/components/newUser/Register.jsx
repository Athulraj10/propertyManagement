import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import propertyLogo from "../../assets/property/propertyLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { newUserRegister } from "../../redux/actions";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Add role to formData state
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.role) newErrors.role = "Role is required"; // Add role validation

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        newUserRegister({
          data: formData,
          callback: (data) => {
            if (data) {
              navigate("/login");
            }
          },
        })
      );
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2 bg-white"
              src={propertyLogo}
              alt="logo"
            />
            Community
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm">{errors.username}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-600 text-sm">{errors.role}</p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute top-10 right-0 pr-3 flex items-center cursor-pointer text-black bg-white "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    autoComplete="off"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute top-10 right-0 pr-3 flex items-center cursor-pointer text-black bg-white "
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link to="/login">
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login here
                    </span>
                  </Link>
                </p>
               
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
