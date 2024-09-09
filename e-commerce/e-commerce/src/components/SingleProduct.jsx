import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useLazyGetSingleProductRatingsQuery,
  useLazyGetSingleProductReviewsQuery,
  useGetSingleProductQuery,
} from "../apis/productApi";
import {
  useNewReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} from "../apis/reviewsApi";
import {
  useDeleteRatingMutation,
  useUpdateRatingMutation,
  useNewRatingMutation,
} from "../apis/ratingsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleProduct() {
  const [newRating] = useNewRatingMutation();
  const [deleteRating] = useDeleteRatingMutation();
  const [updateRating] = useUpdateRatingMutation();
  const [sendNewReview] = useNewReviewMutation();
  const [useEditReview] = useEditReviewMutation();
  const [deleteReivew] = useDeleteReviewMutation();
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });
  const [rating, setRating] = useState(false);
  const [review, setReview] = useState(false);
  const [showRatings] = useLazyGetSingleProductRatingsQuery();
  const [showReviews] = useLazyGetSingleProductReviewsQuery();
  const [newReview, setNewReview] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [updateRatingScore, setUpdateRatingScore] = useState(1);
  const [newRatingScore, setNewRatingScore] = useState(1);
  const sendReview = async () => {
    const data = await sendNewReview({ id, review: newReview });

    if (data.error) return toast.error(data.error.data.error);
    setNewReview(null);
  };

  const sendEditReview = async (e) => {
    const data = await useEditReview({ id: e.target.id, review: editReview });

    if (data.error) return toast.error(data.error.data.error);
    setEditReview(null);
  };

  const { product, ratings, reviews } = useSelector((state) => state.products);
  return !product ? (
    <div>
      <ToastContainer />
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer />
      <section>
        <div class="row">
          <div>
            <div class="card">
              <div
                class="cover item-a"
                style={{ backgroundImage: `url(${product.p_image})` }}
              >
                <h1>
                  {product.p_name.toUpperCase()}
                  <br></br>
                  {product.p_description}
                </h1>
                <span class="price">
                  x{product.p_amount} - ${product.p_price}
                </span>
                <div class="card-back">
                  {(!rating && (
                    <a
                      href="#"
                      id={product.p_id}
                      onClick={(e) => {
                        setRating(true);
                        showRatings(e.target.id);
                        setReview(false);
                      }}
                    >
                      Show Ratings
                    </a>
                  )) || (
                    <a
                      href="#"
                      id={product.p_id}
                      onClick={(e) => {
                        setRating(false);
                      }}
                    >
                      Hide Ratings
                    </a>
                  )}
                  {(!review && (
                    <a
                      href="#"
                      id={product.p_id}
                      onClick={(e) => {
                        setReview(true);
                        showReviews(e.target.id);
                        setRating(false);
                      }}
                    >
                      Show Reviews
                    </a>
                  )) || (
                    <a
                      href="#"
                      id={product.p_id}
                      onClick={(e) => {
                        setReview(false);
                      }}
                    >
                      Hide Reviews
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {token && (
        <div>
          {rating && (
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                marginBottom: "10px",
                marginRight: "10px",
              }}
            >
              <select
                style={{ width: "5%" }}
                class="btn btn-secondary dropdown-toggle"
                onChange={(e) => {
                  setNewRatingScore(e.target.value);
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button
                style={{ width: "5%", marginLeft: "5px" }}
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  const data = newRating({
                    id,
                    rating_score: Number(newRatingScore),
                  });
                  if (data.error) return toast.error(data.error.data.error);
                }}
              >
                Rate
              </button>
            </div>
          )}

          {review && (
            <div
              class="form-group"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <input
                type="text"
                style={{ width: "60%" }}
                class="form-control mb-2"
                id="review"
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Add Review..."
              ></input>
              <button
                style={{ height: "38px" }}
                type="button"
                class="btn btn-primary"
                onClick={sendReview}
              >
                Add Review
              </button>
            </div>
          )}
        </div>
      )}

      {rating && (
        <div>
          <h4 className="display-3 mb-1" style={{ textAlign: "center" }}>
            Ratings{" "}
            <span style={{ float: "right" }}>Avg: {ratings?.avgRating}/5</span>
          </h4>

          <hr />
          {ratings?.ratings.map((rating) => {
            return (
              <div
                className="mt-0"
                key={rating.r_id}
                style={{
                  padding: "10px",
                }}
              >
                <b>{rating.users.u_username}</b> rates this item{" "}
                <b>{rating.r_rating} / 5</b>{" "}
                <small style={{ float: "right" }}>
                  {rating.r_u_id === user?.u_id && (
                    <div>
                      <select
                        onChange={(e) => setUpdateRatingScore(e.target.value)}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                      <Link
                        style={{
                          marginLeft: "5px",
                          textDecoration: "none",
                          color: "blue",
                        }}
                        onClick={() => {
                          updateRating({
                            id: rating.r_id,
                            rating_score: Number(updateRatingScore),
                          });
                        }}
                      >
                        Edit
                      </Link>
                      <Link
                        style={{
                          marginLeft: "15px",
                          textDecoration: "none",
                          color: "red",
                        }}
                        id={rating.r_id}
                        onClick={(e) => {
                          deleteRating(e.target.id);
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  )}
                </small>
                <hr />
              </div>
            );
          })}
        </div>
      )}
      {review && (
        <div>
          <h4 className="display-3 mb-1" style={{ textAlign: "center" }}>
            Reviews
          </h4>
          <hr />
          {reviews.length ? (
            <div>
              {reviews.map((review) => {
                return (
                  <div key={review.r_id}>
                    <p className="mb-0" style={{ padding: "10px" }}>
                      <b>{review.users.u_username}</b> said{" "}
                      {!review.r_deleted
                        ? review.r_review
                        : "This review has been removed..."}{" "}
                      <p style={{ float: "right" }}>
                        {review.r_date.split("T")[0]}
                        {!review.r_deleted &&
                          token &&
                          user?.u_id === review.r_u_id && (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "red",
                                marginLeft: "20px",
                              }}
                              id={review.r_id}
                              onClick={async (e) => {
                                await deleteReivew({ id: e.target.id });
                              }}
                            >
                              Delete
                            </Link>
                          )}
                      </p>
                    </p>

                    {!review.r_deleted &&
                      token &&
                      user?.u_id === review.r_u_id && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <input
                            class="form-control"
                            id="review"
                            onChange={(e) => setEditReview(e.target.value)}
                            type="text"
                            placeholder="Edit Review..."
                          ></input>
                          <button
                            type="button"
                            class="btn btn-primary"
                            id={review.r_id}
                            onClick={sendEditReview}
                            style={{ height: "38px" }}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <h4 className="display-4 mb-1">No Reviews Yet...</h4>
          )}
        </div>
      )}
    </div>
  );
}
