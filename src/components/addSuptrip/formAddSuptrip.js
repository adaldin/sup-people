import "./formAddSuptrip.css";
// React
import { useState } from "react";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
// Context
import { useAuth } from "../../context/AuthContext";

function FormAddSuptrip() {
  const [openForm, setOpenForm] = useState("");
  const [formData, setFormData] = useState({
    coordinates: { entryPoint: "", exitPoint: "" },
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
  });
  // saco de aquí:
  // atendees: [],
  // board: { bestFor: "", size: "", type: "" },
  // createdBy: "aqui usar context y tomar uid",
  // createdOn: new Date(),
  // supTripRate: 0,
  //   supTripTotalHours: 0,
  const [board, setBoard] = useState({
    flatWater: false,
    permorming: false,
    racing: false,
    small: false,
    medium: false,
    large: false,
    solid: false,
    inflatable: false,
  });
  // const [newPaddleTrip, setNewPaddleTrip] = useState({});
  const [tripSaved, setTripSaved] = useState(false);

  //******CONTEXT*/
  const { user } = useAuth();

  //   useEffect(() => {
  //     createNewPaddleTrip(); // eslint-disable-next-line
  //   }, [addresssData],formData);

  function handleAnimation() {
    setOpenForm("drawer");
  }
  function handleInputs(event) {
    let { name, value } = event.target;
    // let newData = { ...formData };
    // newData[name]=value
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleRadios(event) {
    let { name, checked } = event.target;
    console.log(checked);
    setBoard((prevData) => {
      console.log(prevData);
      return { ...prevData, [name]: checked };
    });
  }

  //   function handleFormData(e) {
  //     const { name, value } = e.target;
  //     const atendees = [user.email];

  //     setFormData((prevData) => {
  //       return {
  //         ...prevData,
  //         [name]: value,
  //         atendees: atendees,
  //       };
  //     });
  //   }

  //   function createNewPaddleTrip() {
  //     let atendeesArr = [];
  //     atendeesArr.push(user.email);
  //     let dateToday = new Date();
  //     const isFormEmpty = Object.values(formData).some(
  //       (x) => x === "" || x === []
  //     );

  //     if (addresssData.length > 0 && !isFormEmpty) {
  //       let entryPoint =
  //         addresssData[1].results[0].address_components[2].long_name;
  //       let startingPoint =
  //         addresssData[0].results[0].address_components[2].long_name;
  //       let newPddlTrip = {
  //         geometry: {
  //           coordinates: {
  //             entry: [locations[0].lat, locations[0].lng],
  //             exit: [locations[1].lat, locations[1].lng],
  //           },
  //           type: "Multipoint",
  //         },
  //         properties: {
  //           atendees: atendeesArr,
  //           eventDate: formData.eventDate,
  //           eventName: formData.eventName,
  //           eventTime: formData.eventTime,
  //           ePoint: entryPoint,
  //           sPoint: startingPoint,
  //           eventDescription: formData.eventDescription,
  //         },
  //         type: "Feature",
  //         timeStamp: dateToday,
  //       };
  //       setNewPaddleTrip(newPddlTrip);
  //     }
  //   }

  //   async function handleEventCreation(e) {
  //     e.preventDefault();
  //     try {
  //       const docRef = await addDoc(collection(db, "events"), newPaddleTrip);
  //       console.log("Document written with ID: ", docRef.id);
  //       setTripSaved(true);
  //       window.location.reload(true);
  //     } catch (err) {
  //       console.log("Failed on writing do db: ", err);
  //     }
  //   }
  return (
    <>
      <Accordion onClick={handleAnimation} className={openForm}>
        <Accordion.Item eventKey="1">
          <Accordion.Header>More about your trip</Accordion.Header>
          <Accordion.Body>
            <Row
              as={Form}
              //   onSubmit={handleEventCreation}
              className="bg-transparent px-2  justify-content-evenly"
            >
              <Form.Group as={Col} xs={12} controlId="formBasicTripName">
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                  type="text"
                  name="supTripName"
                  required
                  placeholder="Très viles route"
                  onChange={handleInputs}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a date</Form.Label>
                <Form.Control
                  type="date"
                  name="supTripDate"
                  required
                  placeholder="08/08/2022"
                  onChange={handleInputs}
                />
              </Form.Group>
              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a time</Form.Label>
                <Form.Control
                  type="time"
                  name="supTripHour"
                  required
                  placeholder="07:00"
                  onChange={handleInputs}
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
                  onChange={handleInputs}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Type of board</Form.Label>

                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="Solid"
                    name="solid"
                    type="radio"
                    value="solid"
                    checked={formData.board.type === "solid"}
                    id="solid"
                    onChange={handleRadios}
                  />
                  <Form.Check
                    inline
                    label="Inflatable"
                    name="inflatable"
                    type="radio"
                    value="inflatable"
                    checked={formData.board.type === "inflatable"}
                    id="inflatable"
                    onChange={handleRadios}
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Size of the board</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="10′"
                    name="small"
                    type="radio"
                    value="10′"
                    checked={formData.board.size === "10′"}
                    id="small"
                    onChange={handleRadios}
                  />
                  <Form.Check
                    inline
                    label="10′-12′"
                    name="medium"
                    type="radio"
                    value="10′-12′"
                    checked={formData.board.size === "10′-12′"}
                    id="medium"
                    onChange={handleRadios}
                  />
                  <Form.Check
                    inline
                    label="+12′"
                    name="large"
                    type="radio"
                    value="+12′"
                    checked={formData.board.size === "+12′"}
                    id="large"
                    onChange={handleRadios}
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Board features</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="Flat water"
                    name="flatWater"
                    type="radio"
                    value="flatWater"
                    checked={formData.board.bestFor === "flatWater"}
                    id="flatWater"
                    onChange={handleRadios}
                  />
                  <Form.Check
                    inline
                    label="Performing"
                    name="performing"
                    type="radio"
                    value="performing"
                    checked={formData.board.bestFor === "performing"}
                    id="performing"
                    onChange={handleRadios}
                  />
                  <Form.Check
                    inline
                    label="Racing"
                    name="racing"
                    type="radio"
                    value="racing"
                    checked={board.racing}
                    id="racing"
                    onChange={handleRadios}
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
                  onChange={handleInputs}
                />
              </Form.Group>

              {/* submit */}
              <div className="d-grid py-2">
                {!tripSaved ? (
                  <Button variant="secondary" type="submit">
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
