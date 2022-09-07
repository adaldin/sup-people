import "./formAddSuptrip.css";
// React
import { useState, useContext, useEffect } from "react";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

// Context
import { useAuth } from "../../context/AuthContext";
// import LocationContext from "../../context/locationContext";

function FormAddSuptrip() {
  //******STATES*/
  const [openForm, setOpenForm] = useState("");
  const [checkBoardFeature, setCheckBoardFeature] = useState(false);
  // const [locationsLoaded, setLocationsLoaded] = useState(false);
  // const [addresssData, setAddressData] = useState([]);
  const [formData, setFormData] = useState({
    coordinates: { entryPoint: "", exitPoint: "" },
    atendees: [],
    board: { bestFor: "", size: "", type: "" },
    createdBy: "aqui usar context y tomar uid",
    createdOn: new Date(),
    supTripDate: "",
    supTripDescription: "",
    supTripHour: "",
    supTripLocality: "",
    supTripName: "",
    supTripRate: 0,
    supTripTotalHours: 0,
  });
  const [newPaddleTrip, setNewPaddleTrip] = useState({});
  const [tripSaved, setTripSaved] = useState(false);

  //******CONTEXT*/
  const { user } = useAuth();
  //   const { locations } = useContext(LocationContext);

  //******USEEFFECT*/
  //   useEffect(() => {
  //     function checkLocations() {
  //       if (locations.length === 2) {
  //         setLocationsLoaded(true);
  //       }
  //     }
  //     checkLocations();
  //   }, [locations.length]);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const data = await Promise.all(
  //         locations.map(
  //           async (location) =>
  //             await (
  //               await fetch(
  //                 `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&location_type=ROOFTOP&result_type=street_address&key=${geocodingKey}`
  //               )
  //             ).json()
  //         )
  //       );
  //       setAddressData(data);
  //     }
  //     fetchData(); // eslint-disable-next-line
  //   }, [locationsLoaded]);

  //   useEffect(() => {
  //     createNewPaddleTrip(); // eslint-disable-next-line
  //   }, [addresssData]);
  //   useEffect(() => {
  //     createNewPaddleTrip(); // eslint-disable-next-line
  //   }, [formData]);

  //******LOGIC*/
  function handleAnimation() {
    setOpenForm("drawer");
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
  function handleRadio(e) {
    console.log(e.target.checked);
  }
  function handleClick(e) {
    if (e.target.checked) {
      setCheckBoardFeature((prevCheck) => !prevCheck);
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
              //   onSubmit={handleEventCreation}
              className="bg-transparent px-2  justify-content-evenly"
            >
              <Form.Group as={Col} xs={12} controlId="formBasicTripName">
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                  type="text"
                  name="eventName"
                  required
                  placeholder="Très viles route"
                  //   onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripPlace">
                <Form.Label>Starting Point</Form.Label>
                {/* AQUI GEOCODING TRANSFORMING LAT LNG TI INPUT.VALUE ADDRESS */}
                <Form.Control
                  type="text"
                  name="sPoint"
                  required
                  placeholder="Caldes d'Estrac"
                  //   onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripPlace">
                <Form.Label>Exit Point</Form.Label>
                {/* AQUI GEOCODING TRANSFORMING LAT LNG TI INPUT.VALUE ADDRESS */}
                <Form.Control
                  type="text"
                  name="ePoint"
                  required
                  placeholder="Arenys de Mar"
                  //   onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a date</Form.Label>
                <Form.Control
                  type="date"
                  name="eventDate"
                  required
                  placeholder="08/08/2022"
                  //   onChange={handleFormData}
                />
              </Form.Group>
              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a time</Form.Label>
                <Form.Control
                  type="time"
                  name="eventTime"
                  required
                  placeholder="07:00"
                  //   onChange={handleFormData}
                />
              </Form.Group>
              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Type of board</Form.Label>

                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="Solid"
                    name="typeSolid"
                    type="radio"
                    id="typeSolid"
                    checked={checkBoardFeature}
                    onChange={handleRadio}
                    onClick={handleClick}
                  />
                  <Form.Check
                    inline
                    label="Inflatable"
                    name="typeInflatable"
                    type="radio"
                    id="typeInflatable"
                    checked={checkBoardFeature}
                    onChange={handleRadio}
                    onClick={handleClick}
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Size of the board</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="10′"
                    name="sizeSmall"
                    type="radio"
                    id="sizeSmall"
                  />
                  <Form.Check
                    inline
                    label="10′-12′"
                    name="sizeMedium"
                    type="radio"
                    id="sizeMedium"
                  />
                  <Form.Check
                    inline
                    label="+12′"
                    name="sizeLarge"
                    type="radio"
                    id="sizeLarge"
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} xs={12} controlId="formBasicTripBoard">
                <Form.Label>Board features</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    label="Flat water"
                    name="bestForFlat"
                    type="radio"
                    id="typeSolid"
                  />
                  <Form.Check
                    inline
                    label="Inflatable"
                    name="typeInflatable"
                    type="radio"
                    id="typeInflatable"
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formBasicTripDate">
                <Form.Label>Enter a description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="eventDescription"
                  placeholder="Entering to the water close to the beacons system, turning to the left on the rocks system an moving foward until we reach Areny's Port"
                  required
                  //   onChange={handleFormData}
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
