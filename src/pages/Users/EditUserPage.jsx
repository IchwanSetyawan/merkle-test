import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const EditUserPage = () => {
  //   ------------------------------HOOKS--------------------------------

  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successsMsg, setSuccesssMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);

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

  //   ------------------------------FETCH DATA--------------------------------

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  //   ------------------------------FUNCTION--------------------------------

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

  //   update berdarakan id
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}users/${id}`,
        user
      );
      setIsloading(false);
      setSuccesssMsg("Berhasil mengupdate data user!");
      setTimeout(() => {
        navigate("/users");
      }, [2000]);
    } catch (error) {
      setIsloading(false);
      setErrorMsg("Gagal mengupdate data user!");
      console.error("Error updating user:", error);
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
                Edit User {id}
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="font-semibold">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
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
                    placeholder="Password"
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
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
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
                <button
                  onClick={() => navigate("/users")}
                  className="w-full mt-4 bg-slate-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUserPage;
