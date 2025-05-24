import { useState } from "react";
import { Form, NavLink } from "react-router";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-black">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Form
            method="post"

        >
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            Log In
            </h2>

            <div className="mb-4">
            <label className="block mb-1 font-medium">Username</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
            Log In
            </button>
        </Form>
        <p className="text-center mt-4">
            Don't have a account?
            <span>
                <NavLink to={"/user/signup"}>
                    Sign Up
                </NavLink>
            </span> 
        </p>
      </div>
    </div>
  );
}

export default Login;