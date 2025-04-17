import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:4000/users");
      const users = response.data;
      const userExist = users.find((user) => user.email === email)
      if (!userExist) {
        setError("User not sign up yet, please signup now");
        return;
      }

      if (userExist.password !== password) {
        setError("Incorrect Password");
        return;
      }

      setError("");
      alert("Login Succesfully");
      navigate("/write");
      localStorage.setItem("user", JSON.stringify(userExist));
      window.location.href = "/";

    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center md:min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email.."
                className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password.."
                className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Signup & Forgot Password Links */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <a href="/sign_up" className="text-blue-600 hover:underline ml-1">Sign Up</a>
            </p>
            <p className="text-sm mt-1">
              <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
