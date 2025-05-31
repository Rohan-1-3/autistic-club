import { useEffect, useState } from "react";
import { Form, NavLink, useActionData } from "react-router";
import ErrorsComponent from "../ErrorsComponent";

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [disableButton, setDisableButton] = useState(false)

  useEffect(()=>{
    setDisableButton(result !== null)
  },[result])

  const result = useActionData();
  
  return (
    <div className="text-black min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {
        result && result.errors && <ErrorsComponent errors={result.errors}/>
      }
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Form
            method="POST"
            className=""
        >
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            Create an Account
            </h2>

            <div className="flex gap-4 mb-4">
            <div className="flex-1">
                <label className="block mb-1 font-medium">First Name</label>
                <input
                type="text"
                name="firstname"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="flex-1">
                <label className="block mb-1 font-medium">Last Name</label>
                <input
                type="text"
                name="lastname"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            </div>

            <div className="mb-4">
            <label className="block mb-1 font-medium">Username</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-6">
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={disableButton}
            >
            Sign Up
            </button>
        </Form>
        <p className="text-center mt-4">
            Already have a account?
            <span>
                <NavLink to={"/user/login"}>
                    Login
                </NavLink>
            </span> 
        </p>
      </div>
      
    </div>
  );
}

export default Signup;
