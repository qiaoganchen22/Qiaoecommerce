import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GuestCart() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    window.sessionStorage.getItem("CART")
      ? JSON.parse(window.sessionStorage.getItem("CART"))
      : null
  );
  useEffect(() => {
    const goCart = () => navigate("/cart");
    token && goCart();
  });
  return (
    <div>
      <ToastContainer />
      {!cart ? (
        <h5 className="display-5 mb-3">Empty Cart</h5>
      ) : (
        <div>
          <div className="item_list">
            {Object.entries(cart).map((entry) => {
              return (
                <section key={entry[0]}>
                  <div class="row">
                    <div>
                      <div class="card">
                        <div
                          class="cover item-a"
                          style={{
                            backgroundImage: `url(${entry[1].p_image})`,
                          }}
                        >
                          <h1>
                            {entry[1].p_count}x {entry[1].p_name.toUpperCase()}
                          </h1>
                          <span class="price">${entry[1].p_price}</span>
                          <div class="card-back">
                            <a
                              href="#"
                              onClick={() => {
                                const data = JSON.parse(
                                  window.sessionStorage.getItem("CART")
                                );
                                data[entry[0]].p_count++;
                                window.sessionStorage.setItem(
                                  "CART",
                                  JSON.stringify(data)
                                );
                                setCart(data);
                              }}
                            >
                              +
                            </a>

                            <a
                              href="#"
                              onClick={() => {
                                let data = JSON.parse(
                                  window.sessionStorage.getItem("CART")
                                );
                                if (data[entry[0]].p_count === 1)
                                  delete data[entry[0]];
                                else data[entry[0]].p_count--;
                                if (!Object.keys(data).length) {
                                  window.sessionStorage.removeItem("CART");
                                  data = null;
                                } else
                                  window.sessionStorage.setItem(
                                    "CART",
                                    JSON.stringify(data)
                                  );
                                setCart(data);
                              }}
                            >
                              -
                            </a>

                            <a
                              href="#"
                              onClick={() => {
                                const data = JSON.parse(
                                  window.sessionStorage.getItem("CART")
                                );
                                delete data[entry[0]];
                                if (!Object.keys(data).length) {
                                  window.sessionStorage.removeItem("CART");
                                  setCart(null);
                                } else {
                                  window.sessionStorage.setItem(
                                    "CART",
                                    JSON.stringify(data)
                                  );
                                  setCart(data);
                                }
                              }}
                            >
                              x
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginBottom: "10px",
            }}
          >
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => {
                setCart(null);
                window.sessionStorage.removeItem("CART");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              onClick={() => {
                toast.error("Login or register to checkout.");
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
