import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../apis/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [form, setForm] = useState({ username: null, password: null });
  useEffect(() => {
    const loggedIn = () => {
      navigate("/products/all");
    };
    token && loggedIn();
  });

  const signIn = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password)
      return toast.error("All fields are required.");
    if (form.password.length < 8)
      return toast.error("Invalid username or password.");
    const data = await login(form);
    if (data.error) return toast.error(data.error.data.error);
  };

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ width: "50vw", margin: "auto", marginTop: "10vh" }}>
      <ToastContainer />
      <h1 className="display-1 mb-3">Login</h1>
      <form onSubmit={signIn}>
        <div class="form-group row mb-4">
          <div class="col-sm">
            <input
              type="text"
              class="form-control"
              id="staticEmail"
              name="username"
              onChange={updateForm}
              placeholder="Email"
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <p className="lead" style={{ textAlign: "right" }}>
        No account?{" "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          Register
        </Link>
      </p>
    </div>
  );
}
