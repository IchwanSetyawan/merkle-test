import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layout/Layout";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}users/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="w-64">
          <button
            onClick={() => navigate("/users")}
            className=" bg-primary p-1"
          >
            all list user
          </button>
          <div className="p-8  rounded-md border">
            <h1>User Detail {id}</h1>
            <span>{user && <div>{user?.username}</div>}</span>
            <span>{user && <div>{user?.email}</div>}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
