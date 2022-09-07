// React
import { useState } from "react";
import HomeMapWrapper from "../homeMap/HomeMapWrapper";
import FormAddSuptrip from "./formAddSuptrip";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddSuptrip() {
  const [show, setShow] = useState(false);

  // modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex justify-content-end my-2">
        <Button
          variant="primary"
          onClick={handleShow}
          className="rounded-circle shadow fw-bold"
        >
          +
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} className="modal--container">
        <Modal.Body className="p-0 position-relative">
          <HomeMapWrapper
            className="map--position__container"
            profileMap={true}
          />
          <FormAddSuptrip />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddSuptrip;
