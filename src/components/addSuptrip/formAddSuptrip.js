import "./formAddSuptrip.css";
// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
// Context
import { useAuth } from "../../context/AuthContext";
import useSupTrips from "../../context/SupTripsContext";
import { addSupTriptoDB } from "../../services/APIService/index";

function FormAddSuptrip() {
  // custom hook
  const { currentWaypoints, addSupTrip, supTrips } = useSupTrips();
  const { user } = useAuth();

  const [openForm, setOpenForm] = useState("");
  const [formData, setFormData] = useState({
    supTripDate: "",
    supTripDescription: "",
    supTripHour: "",
    supTripLocality: "",
    supTripName: "",
    board: {
      bestFor: "",
      size: "",
      type: "",
    },
    atendees: [user.uid],
    createdBy: user.uid,
    createdOn: new Date(),
    suptripRate: 0,
  });
  const [coordinates, setCoordinates] = useState({});
  const [newSupTrip, setNewSuptrip] = useState({});
  const [tripSaved, setTripSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentWaypoints) {
      let newCoords = {
        entryPoint: currentWaypoints.entryPoint,
        exitPoint: currentWaypoints.exitPoint,
      };
      setCoordinates(newCoords);
    }
  }, [currentWaypoints]);

  function handleAnimation() {
    setOpenForm("drawer");
  }

  function handleFormData(event) {
    const { name, value, type } = event.target;
    if (
      type !== "radio" &&
      (typeof value !== "array" || typeof value !== "number")
    ) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          board: { ...prevFormData.board, [name]: value },
        };
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let newTrip = {};
    const isFormEmpty = Object.values(formData).some(
      (input) => input === "" || input === []
    );

    if (coordinates && !isFormEmpty) {
      newTrip = { ...formData, coordinates };
      setNewSuptrip(newTrip);
      await addSupTriptoDB(newTrip);
      navigate("/");
    } else {
      event.preventDefault();
      alert("Pss! Some fields are still empty. Fill them and then save ");
    }
  }
  return (
    <>
      <Accordion onClick={handleAnimation} className={openForm}>
        <Accordion.Item eventKey="1">
          <Accordion.Header>More about your trip</Accordion.Header>
          <Accordion.Body>
            <Row
              as={Form}
              onSubmit={handleSubmit}
              className="bg-transparent px-2  justify-content-evenly"
            >
              <Form.Group as={Col} xs={12} controlId="formBasicTripName">
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                  type="text"
                  name="supTripName"
                  required
                  placeholder="Très viles route"
                  onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a date</Form.Label>
                <Form.Control
                  type="date"
                  name="supTripDate"
                  required
                  placeholder="08/08/2022"
                  onChange={handleFormData}
                />
              </Form.Group>
              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a time</Form.Label>
                <Form.Control
                  type="time"
                  name="supTripHour"
                  required
                  placeholder="07:00"
                  onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripPlace">
                <Form.Label>Locality</Form.Label>
                {/* AQUI GEOCODING TRANSFORMING LAT LNG TI INPUT.VALUE ADDRESS */}
                <Form.Control
                  type="text"
                  name="supTripLocality"
                  required
                  placeholder="Caldes d'Estrac"
                  onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Type of board</Form.Label>

                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="Solid"
                    name="type"
                    type="radio"
                    value="solid"
                    checked={formData.board.type === "solid"}
                    id="solid"
                    onChange={handleFormData}
                  />
                  <Form.Check
                    inline
                    label="Inflatable"
                    name="type"
                    type="radio"
                    value="inflatable"
                    checked={formData.board.type === "inflatable"}
                    id="inflatable"
                    onChange={handleFormData}
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Size of the board</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="10′"
                    name="size"
                    type="radio"
                    value="10′"
                    checked={formData.board.size === "10′"}
                    id="small"
                    onChange={handleFormData}
                  />
                  <Form.Check
                    inline
                    label="10′-12′"
                    name="size"
                    type="radio"
                    value="10′-12′"
                    checked={formData.board.size === "10′-12′"}
                    id="medium"
                    onChange={handleFormData}
                  />
                  <Form.Check
                    inline
                    label="+12′"
                    name="size"
                    type="radio"
                    value="+12′"
                    checked={formData.board.size === "+12′"}
                    id="large"
                    onChange={handleFormData}
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Board features</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="Flat water"
                    name="bestFor"
                    type="radio"
                    value="flatWater"
                    checked={formData.board.bestFor === "flatWater"}
                    id="flatWater"
                    onChange={handleFormData}
                  />
                  <Form.Check
                    inline
                    label="Performing"
                    name="bestFor"
                    type="radio"
                    value="performing"
                    checked={formData.board.bestFor === "performing"}
                    id="performing"
                    onChange={handleFormData}
                  />
                  <Form.Check
                    inline
                    label="Racing"
                    name="bestFor"
                    type="radio"
                    value="racing"
                    checked={formData.board.bestFor === "racing"}
                    id="racing"
                    onChange={handleFormData}
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripDate">
                <Form.Label>Enter a description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="supTripDescription"
                  placeholder="Entering to the water close to the beacons system, turning to the left on the rocks system an moving foward until we reach Areny's Port"
                  required
                  onChange={handleFormData}
                />
              </Form.Group>

              {/* submit */}
              <div className="d-grid py-2">
                {!tripSaved ? (
                  <Button variant="primary" type="submit">
                    Save Trip
                  </Button>
                ) : (
                  <Button variant="success" type="submit" disabled>
                    Trip Saved!
                  </Button>
                )}
              </div>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
export default FormAddSuptrip;
