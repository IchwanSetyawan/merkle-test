import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, serUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successsMsg, setSuccesssMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/login`,
        {
          username,
          password,
        }
      );
      setIsloading(false);
      setSuccesssMsg("Berhasil login!");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      setIsloading(false);
      setErrorMsg("*username atau password salah");
      console.error("Error during API call", error);
    }
  };

  return (
    <>
      <div className="bg-white md:bg-[#00447F] h-screen  flex justify-center items-center">
        <div className="w-full md:w-2/6">
          <div className=" rounded-xl bg-white col-span-2 p-8 md:p-16 flex justify-center md:-mt-0 z-50 md:z-0">
            <div className="w-full ">
              <div className="flex justify-center items-center mt-12">
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-5 rounded-lg w-full  bg-white   rounded-t-lg "
                >
                  {errorMsg && (
                    <span className="text-red-500 font-sm">{errorMsg}</span>
                  )}
                  {successsMsg && (
                    <span className="text-green-600 font-sm">
                      {successsMsg}
                    </span>
                  )}
                  <h1 className="text-2xl md:text-3xl font-semibold mb-5">
                    Login
                  </h1>
                  <div className="flex flex-col justify-center gap-2">
                    <label className="text-primary font-semibold text-lg ">
                      Username
                    </label>
                    <input
                      name="username"
                      value={username}
                      onChange={(e) => {
                        serUsername(e.target.value);
                        setSuccesssMsg("");
                        setErrorMsg("");
                      }}
                      type="text"
                      className="p-3 rounded-md w-full border border-slate-300 text-base focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2 ">
                    <label className="text-primary text-lg font-semibold">
                      Password
                    </label>
                    <div className="relative text-gray-600 focus-within:text-gray-400">
                      <input
                        name="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setSuccesssMsg("");
                          setErrorMsg("");
                        }}
                        value={password}
                        type="password"
                        className="p-3 pr-10 rounded-md w-full border border-slate-300 text-base focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      disabled={isLoading || !username || !password}
                      type="submit"
                      className="bg-primary text-white rounded-md text-sm px-6 py-3  w-full"
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
