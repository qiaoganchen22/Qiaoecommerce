import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCancelOrderMutation } from "../apis/ordersApi.js";

export default function Orders() {
  const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const [cancelOrder] = useCancelOrderMutation();

  const tryCancelOrder = async (e) => {
    const data = await cancelOrder(e.target.id);
    console.log(data);
    if (data.error) return alert(data.error.data.error);
    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
  };
  return (
    <Modal show={show3} onHide={handleClose3}>
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
                    {order.o_card}
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
    // <div>
    //   <h5 className="display-5 mb-1">Orders</h5>

    // </div>
  );
}
