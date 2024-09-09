import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Reviews() {
  const { reviews } = useSelector((state) => state.reviews);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <Modal show={show1} onHide={handleClose1}>
      <Modal.Header closeButton>
        <Modal.Title>Review History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        {reviews.length &&
          reviews.map((review) => {
            return (
              <div key={review.r_id} style={{ display: "flex" }}>
                <p className="mb-0">
                  <b>Product ID: </b>
                  {review.r_p_id}
                </p>
                <p className="mb-0">
                  <b>Product Name: </b>
                  {review.products.p_name}
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
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    // <div>
    //   <h5 className="display-5 mb-1">All Reviews</h5>

    // </div>
  );
}
