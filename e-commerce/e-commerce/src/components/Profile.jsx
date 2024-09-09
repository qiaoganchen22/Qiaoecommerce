import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCloseAccountMutation, useUpdateMutation } from "../apis/userApi";
import { useLazyGetReviewsQuery } from "../apis/reviewsApi";
import { useLazyShowAllRatingsQuery } from "../apis/ratingsApi";
import { useCancelOrderMutation } from "../apis/ordersApi.js";
import {
  useLazyGetCancelledOrdersQuery,
  useLazyGetCompletedOrdersQuery,
} from "../apis/ordersApi";
import { useLazyGetMessagesQuery } from "../apis/messagesApi";
import { logout } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Reviews from "./Reviews";
import Ratings from "./Ratings";
import Orders from "./Orders";
import Messages from "./Messages";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useReadMessageMutation,
  useRemoveMessageMutation,
} from "../apis/messagesApi";

export default function Profile() {
  const [showReviewsList] = useLazyGetReviewsQuery();
  const [showMessagesList] = useLazyGetMessagesQuery();
  const [showRatingsList] = useLazyShowAllRatingsQuery();
  const [showCompletedList] = useLazyGetCompletedOrdersQuery();
  const [showCancelledList] = useLazyGetCancelledOrdersQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendUpdateUser] = useUpdateMutation();
  const [sendCloseUser] = useCloseAccountMutation();
  const { user, token } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });
  const { orders } = useSelector((state) => state.orders);
  const [cancelOrder] = useCancelOrderMutation();

  const tryCancelOrder = async (e) => {
    const data = await cancelOrder(e.target.id);
    console.log(data);
    if (data.error) return toast.error(data.error.data.error);
  };
  const [show3, setShow3] = useState(false);
  const { messages } = useSelector((state) => state.messages);
  const [readMessage] = useReadMessageMutation();
  const [removeMessage] = useRemoveMessageMutation();
  const [show4, setShow4] = useState(false);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [showMessages, setShowMessages] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [show, setShow] = useState(false);
  const { reviews } = useSelector((state) => state.reviews);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const { ratings } = useSelector((state) => state.ratings);
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const loggedOut = () => navigate("/");
    !token && loggedOut();
  });
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const updateUser = async (e) => {
    e.preventDefault();
    const data = await sendUpdateUser(form);
  };
  const closeUser = async () => {
    await sendCloseUser();
    dispatch(logout());
  };
  return (
    <div class="wrapper">
      <ToastContainer />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Account Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group row mb-2">
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
          <div class="form-group row mb-2">
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
          <div class="form-group row mb-2">
            <div class="col-sm">
              <input
                type="text"
                class="form-control"
                name="password"
                onChange={updateForm}
                placeholder="Password"
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
              handleClose();
              updateUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Review History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {reviews.length
            ? reviews.map((review) => {
                return (
                  <div key={review.r_id}>
                    <p className="mb-0">
                      <b>Product: </b>
                      {review.products.p_name.toUpperCase()}
                    </p>
                    <p className="mb-0">
                      <b>Review: </b>
                      {review.r_review}
                    </p>
                    <p className="mb-0">
                      <b>Date: </b>
                      {review.r_date.split("T")[0]}
                    </p>
                    {/* {review.r_edited.toString()} deleted {review.r_deleted.toString()} */}
                    <hr />
                  </div>
                );
              })
            : "No Reviews..."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered size="s">
        <Modal.Header closeButton>
          <Modal.Title>Rating History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ratings.length
            ? ratings.map((rating) => {
                return (
                  <div key={rating.r_id}>
                    <p className="mb-0">
                      <b>Product: </b>
                      {rating.products.p_name.toUpperCase()}
                    </p>
                    <p className="mb-0">
                      <b>Rating: </b>
                      {rating.r_rating} / 5
                    </p>
                    <hr />
                  </div>
                );
              })
            : "No Ratings..."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show4} onHide={handleClose4} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Inbox</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {!messages.length ? (
              <p>No new messages...</p>
            ) : (
              <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-bordered table-striped">
                  {messages.map((message) => {
                    return (
                      <React.Fragment key={message.m_id}>
                        <div className="card-body">
                          <div>
                            <div>
                              <p className="mb-0">
                                <strong>From: </strong>
                                {message.m_sender}

                                <small style={{ float: "right" }}>
                                  <i className="bi bi-clock-history"></i>{" "}
                                  {message.m_date.split("T")[0]}{" "}
                                  <span>
                                    <Link
                                      style={{
                                        color: "red",
                                        textDecoration: "none",
                                        marginRight: "10px",
                                      }}
                                      id={message.m_id}
                                      onClick={(e) => {
                                        removeMessage(e.target.id);
                                      }}
                                    >
                                      {/* <i
                                        className="bi bi-trash-fill"
                                        // id={message.message_id}
                                        // onClick={deleteMessageInbox}
                                      ></i> */}
                                      Delete
                                    </Link>
                                    {!message.m_seen && (
                                      <Link
                                        style={{
                                          color: "blue",
                                          textDecoration: "none",
                                        }}
                                        id={message.m_id}
                                        onClick={(e) => {
                                          readMessage(e.target.id);
                                        }}
                                      >
                                        {/* <i
                                        className="bi bi-trash-fill"
                                        // id={message.message_id}
                                        // onClick={deleteMessageInbox}
                                      ></i> */}
                                        Read
                                      </Link>
                                    )}
                                  </span>
                                </small>
                              </p>
                              <p
                                className="mb-0"
                                style={{ wordBreak: "break-all" }}
                              >
                                <strong>{message.m_title}: </strong>
                                {message.m_message}
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className="my-0" />
                      </React.Fragment>
                    );
                  })}
                </table>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose3} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders.length
            ? orders.map((order) => {
                return (
                  <div key={order.o_id}>
                    <p className="mb-0">
                      <b>Total: </b>${order.o_total}
                    </p>
                    <p className="mb-0">
                      <b>Date: </b> {order.o_date.split("T")[0]}
                    </p>
                    <p className="mb-0">
                      <b>Card: </b>
                      {order.o_card.slice(0, 4) +
                        "-XXXX-XX" +
                        order.o_card.slice(10, 12) +
                        "-" +
                        order.o_card.slice(12)}
                    </p>
                    <p className="mb-0">
                      <b>Address: </b>
                      {order.o_address}
                    </p>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      id={order.o_id}
                      onClick={(e) => {
                        navigate(`/order/${e.target.id}/orderdetails`);
                      }}
                    >
                      Show Details
                    </button>
                    {order.o_status !== "cancel" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        type="button"
                        class="btn btn-warning"
                        id={order.o_id}
                        onClick={tryCancelOrder}
                      >
                        Cancel
                      </button>
                    )}
                    <hr />
                  </div>
                );
              })
            : "No orders..."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="profile">
        <div class="overlay">
          <div class="about d-flex flex-column">
            <h4>
              {user?.u_firstname} {user?.u_lastname}
            </h4>{" "}
            <span>@{user?.u_username}</span>
          </div>
          <ul class="social-icons">
            <li>
              <button type="button" class="btn btn-danger" onClick={closeUser}>
                Close
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-warning"
                onClick={handleShow}
              >
                Update
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-light"
                onClick={() => {
                  handleShow1();
                  showReviewsList();
                }}
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-light"
                onClick={() => {
                  handleShow2();
                  showRatingsList();
                }}
              >
                Ratings
              </button>
            </li>
            <li>
              {" "}
              <button
                type="button"
                class="btn btn-light"
                onClick={() => {
                  showCompletedList();
                  handleShow3();
                }}
              >
                Completed
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-light"
                onClick={() => {
                  showCancelledList();
                  handleShow3();
                }}
              >
                Cancelled
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-light"
                onClick={() => {
                  showMessagesList();
                  handleShow4();
                }}
              >
                Messages
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>


  );
}
