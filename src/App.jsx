import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import UserPage from "./pages/Users/UsersPage";
import DetailPage from "./pages/Users/DetailPage";
import AddUserPage from "./pages/Users/AddUserPage";
import EditUserPage from "./pages/Users/EditUserPage";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/users"
            exact
            element={
              isAuthenticated() ? <UserPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-user"
            exact
            element={
              isAuthenticated() ? <AddUserPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/users/:id"
            exact
            element={
              isAuthenticated() ? <DetailPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/user-edit/:id"
            exact
            element={
              isAuthenticated() ? <EditUserPage /> : <Navigate to="/login" />
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
