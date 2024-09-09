import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../apis/cartApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useIncreaseItemMutation,
  useRemoveItemMutation,
  useDecreaseItemMutation,
  useCancelCartMutation,
  useCheckoutCartMutation,
} from "../apis/cartApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";

export default function Cart() {
  const [checkoutCart] = useCheckoutCartMutation();
  const [cancelCart] = useCancelCartMutation();
  const [decreaseItem] = useDecreaseItemMutation();
  const [increaseItem] = useIncreaseItemMutation();
  const [removeItem] = useRemoveItemMutation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ card: "", address: "" });
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  useGetCartQuery(null, { refetchOnMountOrArgChange: true });
  const { cart } = useSelector((state) => state.cart);
  const validateForm = async (id) => {
    // e.preventDefault();

    if (!form.card.length || !form.address.length)
      return toast.error("All fields are required");
    if (form.card.length !== 16) return toast.error("Card Invalid");

    const data = await checkoutCart({
      id: id,
      card: form.card,
      address: form.address,
    });
    navigate("/profile");
  };
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    const goGuest = () => navigate("/gcart");
    !token && goGuest();
  });
  return (
    <div>
      <ToastContainer />
      {!Object.keys(cart).length ? (
        <h5 className="display-5 mb-3">Empty Cart</h5>
      ) : (
        <div className="item_list">
          {cart.items.map((item) => {
            return (
              <section key={item.ci_id}>
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
                          {item.ci_count}x {item.products.p_name.toUpperCase()}
                        </h1>
                        <span class="price">${item.products.p_price}</span>
                        <div class="card-back">
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              increaseItem({
                                id: cart.cart.c_id,
                                i_id: item.ci_p_id,
                              });
                            }}
                          >
                            +
                          </a>

                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              decreaseItem({
                                id: cart.cart.c_id,
                                i_id: item.ci_p_id,
                              });
                            }}
                          >
                            -
                          </a>

                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem({
                                id: cart.cart.c_id,
                                i_id: item.ci_p_id,
                              });
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
      )}
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginBottom: "10px",
        }}
      >
        {Object.keys(cart).length ? (
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => cancelCart(cart.cart.c_id)}
          >
            Cancel
          </button>
        ) : (
          <button type="button" class="btn btn-warning">
            Cancel
          </button>
        )}
        {Object.keys(cart).length ? (
          <button
            type="button"
            class="btn btn-primary"
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={handleShow}
            // onClick={() => setShowCheckout(!showCheckout)}
          >
            Checkout
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-primary"
            style={{ marginLeft: "10px", marginRight: "10px" }}
            // onClick={handleShow}
            // onClick={() => setShowCheckout(!showCheckout)}
          >
            Checkout
          </button>
        )}
      </div>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Checkout Total: $
            {cart?.items
              ?.reduce((val, item) => {
                val += Number(item.products.p_price) * item.ci_count;
                return val;
              }, 0)
              .toFixed(2)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group row mb-4">
            <div class="col-sm">
              <input
                type="text"
                class="form-control"
                name="card"
                onChange={updateForm}
                placeholder="Card"
              />
            </div>
          </div>
          <div class="form-group row mb-4">
            <div class="col-sm">
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={updateForm}
                placeholder="Address"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              validateForm(cart.cart.c_id);
              handleClose();
            }}
          >
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {showCheckout && Object.keys(cart).length && (
        <div>
          <p className="lead">
            <b>Checkout Total: $</b>{" "}
            {cart?.items
              ?.reduce((val, item) => {
                val += Number(item.products.p_price) * item.ci_count;
                return val;
              }, 0)
              .toFixed(2)}
          </p>

          <form
            id={cart.cart.c_id}
            onSubmit={(e) => validateForm(e)}
            style={{ width: "50vw" }}
          >
            <div class="form-group row mb-4">
              <div class="col-sm">
                <input
                  type="text"
                  class="form-control"
                  name="card"
                  onChange={updateForm}
                  placeholder="Card"
                />
              </div>
            </div>
            <div class="form-group row mb-4">
              <div class="col-sm">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={updateForm}
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="col-auto" style={{ textAlign: "right" }}>
              <button type="submit" className="btn btn-primary">
                Checkout
              </button>
            </div>
          </form>
        </div>
      )} */}
    </div>
  );
}
