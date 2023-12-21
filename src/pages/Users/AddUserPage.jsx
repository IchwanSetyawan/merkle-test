import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const AddUserPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successsMsg, setSuccesssMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
    address: {
      city: "",
      street: "",
      number: 0,
      zipcode: "",
      geolocation: { lat: "", long: "" },
    },
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setUser((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}users`,
        user
      );
      setSuccesssMsg("Data berhasil ditambahkan");
      setIsloading(false);
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      setIsloading(false);

      setErrorMsg("Data gagal ditambahkan");
      console.error("Error adding user:", error);
    }
  };

  return (
    <Layout>
      <div className="h-screen">
        <div className="flex flex-col justify-center items-center h-screen">
          {errorMsg && <span className="text-red-500 font-sm">{errorMsg}</span>}
          {successsMsg && (
            <span className="text-green-600 font-sm">{successsMsg}</span>
          )}
          <div className="bg-slate-300 border border-gray-200 p-4 w-[500px] ">
            <div>
              <h1 className="font-bold text-xl text-primary mb-4">
                Tambah User
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="font-semibold">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Password:</label>
                  <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Firstname:</label>
                  <input
                    type="text"
                    name="name.firstname"
                    value={user.name.firstname}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Lastname:</label>

                  <input
                    type="text"
                    name="name.lastname"
                    value={user.name.lastname}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Email:</label>

                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  disabled={
                    isLoading ||
                    !user.username ||
                    !user.password ||
                    !user.name.firstname ||
                    !user.name.lastname ||
                    !user.email
                  }
                  type="submit"
                  className={`w-full py-2 px-4 rounded ${
                    isLoading ||
                    !user.username ||
                    !user.password ||
                    !user.name.firstname ||
                    !user.name.lastname ||
                    !user.email
                      ? "bg-slate-500"
                      : "bg-blue-500"
                  } text-white`}
                >
                  {isLoading ? "Loading..." : "Save"}
                </button>
                <button
                  onClick={() => navigate("/users")}
                  className="w-full mt-3 bg-red-500 text-white py-2 px-4 rounded"
                >
                  back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUserPage;
