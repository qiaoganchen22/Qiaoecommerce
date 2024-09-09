import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { clearReviews } from "../slices/reviewsSlice";
import { clearRatings } from "../slices/ratingsSlice";
import { clearOrders } from "../slices/ordersSlice";
import { clearMessages } from "../slices/messagesSlice";
import { clearCart } from "../slices/cartSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="display-1 mb-3">Home</h1>
      <div>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          onClick={() => navigate("/products/all")}
        >
          Show All Items
        </button>
      </div>
      <div>
        {token && (
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={() => navigate("/cart")}
          >
            Go To Cart
          </button>
        )}
      </div>

      <div>
        {!token && (
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={() => navigate("/gcart")}
          >
            Go To Cart
          </button>
        )}
      </div>

      {!token && (
        <div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </button>{" "}
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}

      {token && (
        <div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
      )}
      {token && (
        <div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
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
        </div>
      )}
    </div>
  );
}
