import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { login } from "../Services/AuthService";
import landingImage from "../assets/images/landing.webp";
import logo from "../assets/logos/fugal-white-logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password, setLoggedIn);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen md:flex-row flex-col-reverse">
      {/* Image Section */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImage})` }}
      ></div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-ff_background_dark p-3 min-h-screen md:min-h-0">
        <div className="space-y-6 w-full max-w-md">
          <div className="text-center">
            <img className="mx-auto h-16 w-auto mb-4" src={logo} alt="Fugal" />
            {/* <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2> */}
          </div>

          <div className="shadow-sm  rounded-lg p-10 bg-ff_bg_sidebar_dark">
            <form className="space-y-6 mt-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-customYellow px-3 py-1.5 text-sm font-semibold leading-6 text-ff_background_dark shadow-sm hover:bg-customYellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
