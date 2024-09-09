import React from "react";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { clearReviews } from "../slices/reviewsSlice";
import { clearRatings } from "../slices/ratingsSlice";
import { clearOrders } from "../slices/ordersSlice";
import { clearMessages } from "../slices/messagesSlice";
import { clearCart } from "../slices/cartSlice";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  initMDB({ Dropdown, Collapse });
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div class="container-fluid">
        <button
          data-mdb-collapse-init
          class="navbar-toggler"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="navbar-brand mt-2 mt-lg-0" href="#"></a>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                onClick={() => navigate("/products/all")}
              >
                Home
              </a>
            </li>

            {token && (
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </a>
              </li>
            )}

            {token && (
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => navigate("/cart")}>
                  Cart
                </a>
              </li>
            )}

            {!token && (
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => navigate("/gcart")}>
                  Cart
                </a>
              </li>
            )}
          </ul>
        </div>

        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            {!token && (
              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-link px-1 me-1"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            {!token && (
              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-link px-1 me-1"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            )}
            {token && (
              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-link px-1 me-1"
                onClick={() => {
                  dispatch(clearMessages());
                  dispatch(clearOrders());
                  dispatch(clearRatings());
                  dispatch(clearReviews());
                  dispatch(logout());
                  dispatch(clearCart());
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
