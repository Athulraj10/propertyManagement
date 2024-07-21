import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import propertyLogo from '../../assets/property/propertyLogo.png'
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "username is required";
    if (!formData.password) newErrors.password = "Password is required";

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
        login({
          data:formData,
          callback:(data)=>{
            if(data){
              navigate('/')
            }
          }
        })
      );
    }
  };

  return (
    <div className="">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2 bg-white"
              src={propertyLogo}
              alt="logo"
            />
            Community Login
          </a>
          <div className="w-full bg-white border rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    autoComplete="off"
                    type="username"
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
                    className=" absolute top-10 right-0 pr-3 flex items-center cursor-pointer text-black bg-white "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?
                 <Link to="/register">
                 <span
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </span>
                 </Link>
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Admin Login?
                  <Link to="/admin/login">
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

export default Login;
