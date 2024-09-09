import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../apis/ordersApi";

export default function OrderDetails() {
  const { id } = useParams();
  useGetOrderDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.orders);
  return (
    <div>
      <h2 className="display-2 mb-1">
        Order <b>#{id}</b> Details
      </h2>
      {
        items.length && (
          <div className="item_list">
            {items.map((item) => {
              return (
                <section key={item.i_id}>
                  <div class="row">
                    <div>
                      <div class="card">
                        <div
                          class="cover item-a"
                          style={{
                            backgroundImage: `url(${item.products.p_image})`,
                          }}
                        >
                          <h1>
                            {item.i_count}x {item.products.p_name.toUpperCase()}
                          </h1>
                          <span class="price">${item.products.p_price}</span>
                          <div class="card-back">
                            <a
                              href="#"
                              onClick={() => {
                                navigate(`/products/single/${item.i_p_id}`);
                              }}
                            >
                              View Details
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
        )
        // <div key={item.i_id}>
        //   <p className="mb-0">
        //     <b>Item Name: </b>
        //     {item.products.p_name}
        //   </p>
        //   <p className="mb-0">
        //     <b>Price: </b>${item.products.p_price}
        //   </p>
        //   <p className="mb-0">
        //     <b>Amount: x</b>
        //     {item.i_count}
        //   </p>
        //   <button
        //     type="button"
        //     class="btn btn-primary"
        //     onClick={() => {
        //       navigate(`/products/single/${item.i_p_id}`);
        //     }}
        //   >
        //     View Item
        //   </button>
        //   <hr />
        // </div>
        // );
      }
    </div>
  );
}
