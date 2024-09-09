import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../apis/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    username: "",
  });
  useEffect(() => {
    const loggedIn = () => navigate("/products/all");
    token && loggedIn();
  });
  const register = async (e) => {
    e.preventDefault();
    if (!form.firstname || !form.lastname || !form.password || !form.username)
      return toast.error("All fields are required.");
    if (form.password.length < 8)
      return toast.error("Password must be atleast 8 characters");
    if (form.username.length > 20 || form.username.length < 8)
      return toast.error("Username must be between 8 and 20 characters");
    const data = await registerUser(form);
    console.log(data);
    if (data.error) return toast.error(data.error.data.error);
  };
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={{ width: "50vw", margin: "auto", marginTop: "10vh" }}>
      <ToastContainer />
      <h1 className="display-1 mb-3">Register</h1>
      <form onSubmit={register}>
        <div class="form-group row mb-4">
          <div class="col-sm">
            <input
              type="text"
              class="form-control"
              name="firstname"
              onChange={updateForm}
              placeholder="First Name"
            />
          </div>
        </div>
        <div class="form-group row mb-4">
          <div class="col-sm">
            <input
              type="text"
              class="form-control"
              name="lastname"
              onChange={updateForm}
              placeholder="Last Name"
            />
          </div>
        </div>
        <div class="form-group row mb-4">
          <div class="col-sm">
            <input
              type="text"
              class="form-control"
              name="username"
              onChange={updateForm}
              placeholder="Username"
            />
          </div>
        </div>
        <div class="form-group row mb-4">
          <div class="col-sm">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              onChange={updateForm}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="col-auto" style={{ textAlign: "right" }}>
          <button type="submit" className="btn btn-primary mb-2">
            Register
          </button>
        </div>
      </form>
      <p className="lead" style={{ textAlign: "right" }}>
        Have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </p>
    </div>
  );
}
