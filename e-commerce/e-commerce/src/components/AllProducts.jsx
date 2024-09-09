import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../apis/productApi";
import { useAddToCartMutation } from "../apis/productApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllProducts() {
  const [addToCart] = useAddToCartMutation();
  useGetAllProductsQuery();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.user);
  const add = (id) => {
    // toast.success("Item added to cart.");
    addToCart(id);
  };
  return (
    <div>
      <ToastContainer />
      <div className="item_list mt-5 mb-5" style={{ padding: "5px" }}>
        {products.length ? (
          products.map((product) => {
            return (
              <section key={product.p_id}>
                <div class="row">
                  <div>
                    <div className="card">
                      <div
                        class="cover item-a"
                        style={{ backgroundImage: `url(${product.p_image})` }}
                      >
                        <h1>{product.p_name.toUpperCase()}</h1>
                        <span class="price">${product.p_price}</span>
                        <div
                          class="card-back"
                          // style={{ backgroundImage: `url(${product.p_image})` }}
                        >
                          {token && (
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                toast.success("Item added to cart.");
                                add(product.p_id);
                              }}
                            >
                              Add to cart
                            </a>
                          )}
                          {!token && (
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                toast.success("Item added to cart.");
                                const cart = window.sessionStorage.getItem(
                                  "CART"
                                )
                                  ? JSON.parse(
                                      window.sessionStorage.getItem("CART")
                                    )
                                  : {};
                                if (cart[product.p_id])
                                  cart[product.p_id].p_count++;
                                else
                                  cart[product.p_id] = {
                                    p_count: 1,
                                    p_image: product.p_image,
                                    p_name: product.p_name,
                                    p_price: product.p_price,
                                  };
                                window.sessionStorage.setItem(
                                  "CART",
                                  JSON.stringify(cart)
                                );
                              }}
                            >
                              Add to cart
                            </a>
                          )}
                          <a
                            href=""
                            id={product.p_id}
                            onClick={(e) => {
                              e.preventDefault();
                              toast.success("Item added to cart.");
                              console.log(e.target.id);
                              navigate(`/products/single/${e.target.id}`);
                            }}
                          >
                            View detail
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        ) : (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}
