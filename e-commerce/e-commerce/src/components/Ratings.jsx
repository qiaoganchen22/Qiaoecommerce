import React from "react";
import { useSelector } from "react-redux";

export default function Ratings() {
  const { ratings } = useSelector((state) => state.ratings);
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <Modal show={show2} onHide={handleClose2} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rating History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ratings.length
          ? ratings.map((rating) => {
              return (
                <div key={rating.r_id}>
                  <p className="mb-0">
                    <b>Product ID: </b>
                    {rating.r_p_id}
                  </p>
                  <p className="mb-0">
                    <b>Product Name: </b>
                    {rating.products.p_name}
                  </p>
                  <p className="mb-0">
                    <b>Rating: </b>
                    {rating.r_rating} / 5
                  </p>
                  <hr />
                </div>
              );
            })
          : "No ratings..."}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose2}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    // <div>
    //   <h5 className="display-5 mb-1">All Ratings</h5>

    // </div>
  );
}
