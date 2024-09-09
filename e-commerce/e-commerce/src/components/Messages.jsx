import React from "react";
import { useSelector } from "react-redux";
import {
  useReadMessageMutation,
  useRemoveMessageMutation,
} from "../apis/messagesApi";
export default function Messages() {
  const { messages } = useSelector((state) => state.messages);
  const [readMessage] = useReadMessageMutation();
  const [removeMessage] = useRemoveMessageMutation();
  const [show4, setShow4] = useState(false);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  return (
    <Modal show={show} onHide={handleClose4} centered size="xl">
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
                              <strong>Subject: </strong>
                              {message.m_title}

                              <small style={{ float: "right" }}>
                                <i className="bi bi-clock-history"></i>{" "}
                                {message.m_date.split("T")[0]}{" "}
                                <span>
                                  <Link style={{ color: "red" }}>
                                    <i
                                      className="bi bi-trash-fill"
                                      // id={message.message_id}
                                      // onClick={deleteMessageInbox}
                                    ></i>
                                  </Link>
                                </span>
                              </small>
                            </p>
                            <p
                              className="mb-0"
                              style={{ wordBreak: "break-all" }}
                            >
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
    // <div>
    //   <h5 className="display-5 mb-1">Messages</h5>
    //   {messages.length &&
    //     messages.map((message) => {
    //       return (
    //         <div key={message.m_id}>
    //           <p className="mb-0">
    //             <b>Date: </b>
    //             {message.m_date.split("T")[0]}
    //           </p>
    //           <p className="mb-0">
    //             <b>From: </b>
    //             {message.m_sender}
    //           </p>
    //           <p className="mb-0">
    //             <b>Subject: </b>
    //             {message.m_title}
    //           </p>
    //           <p className="mb-0">
    //             <b>Message: </b>
    //             {message.m_message}
    //           </p>

    //           {!message.m_seen && (
    //             <button
    //               type="button"
    //               class="btn btn-secondary"
    //               id={message.m_id}
    //               onClick={(e) => {
    //                 readMessage(e.target.id);
    //               }}
    //             >
    //               Read
    //             </button>
    //           )}
    //           <button
    //             type="button"
    //             class="btn btn-danger"
    //             id={message.m_id}
    //             onClick={(e) => {
    //               removeMessage(e.target.id);
    //             }}
    //           >
    //             Delete
    //           </button>
    //           <hr />
    //         </div>
    //       );
    //     })}
    // </div>
  );
}
