import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const UserPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [isLoading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successsMsg, setSuccesssMsg] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // fetch data
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}users?sort=${sortOrder}`
      );
      setUsers(response.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function untuk delete user
  const deleteUser = async (id) => {
    setIsLoadingDelete(true);
    setDeletingUserId(id);

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}users/${id}`);
      setSuccesssMsg("Berhasil menghapus user!");
      setIsLoadingDelete(false);
      setDeletingUserId(null);
      setTimeout(() => {
        fetchData();
        setSuccesssMsg("");
      }, 1000);
    } catch (error) {
      setIsLoadingDelete(false);
      setErrorMsg("Gagal menghapus user!");
      setDeletingUserId(null);
      console.error("Error deleting user: ", error);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {errorMsg && <span className="text-red-500 font-sm">{errorMsg}</span>}
        {successsMsg && (
          <span className="text-green-600 font-sm">{successsMsg}</span>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold my-4">All Users</h2>
          <div className="flex gap-4">
            <button
              className="bg-primary px-2 py-1 text-white rounded-md "
              onClick={() => handleSortChange("asc")}
            >
              Sort Ascending
            </button>
            <button
              className="bg-yellow-400 px-2 py-1 text-white rounded-md"
              onClick={() => handleSortChange("desc")}
            >
              Sort Descending
            </button>
          </div>
          <div>
            <button
              className="text-white bg-green-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              onClick={() => navigate("/add-user")}
            >
              Add New User
            </button>
          </div>
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">NO</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className=" h-64 items-center">Loading...</div>
          ) : (
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <Link to={`/users/${user.id}`} className="text-blue-500">
                      Detail
                    </Link>
                    <Link
                      to={`/user-edit/${user.id}`}
                      className="text-green-500"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-500"
                      onClick={() => deleteUser(user.id)}
                      disabled={isLoadingDelete && deletingUserId === user.id}
                    >
                      {isLoadingDelete && deletingUserId === user.id
                        ? "Menghapus..."
                        : "Hapus"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Pagination Component */}
        <div className="py-2">
          <nav>
            <ul className="flex pl-0 list-none rounded">
              {Array.from(
                { length: Math.ceil(users.length / usersPerPage) },
                (_, i) => (
                  <li key={i} className="mr-3">
                    <button
                      onClick={() => paginate(i + 1)}
                      className="py-1 px-3 leading-tight text-blue-700 bg-white rounded border border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
