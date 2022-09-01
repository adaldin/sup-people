import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { getUserName } from "../../services/usersService";
import "../../global.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PaddleTripsItem({
  id,
  supTripName,
  supTripDate,
  atendees,
  supTripHour,
  supTripLocality,
  deleteTrip,
}) {
  const [atendeesNames, setAtendeesNames] = useState([]);

  useEffect(() => {
    async function getAtendeesNames() {
      let names = [];

      atendees.map(async (atendeeUID) => {
        const data = await getUserName(atendeeUID);
        const name = await data;
        names.push(name);
        setAtendeesNames(names);
        return name;
      });
    }
    getAtendeesNames();
  }, [atendees]);

  return (
    <Card className="borders p-1 bg-light bg-opacity-50 shadow-sm card__container ">
      <Card.Body className="p-1">
        <div className="d-flex align-items-baseline  justify-content-between gap-2 mb-0">
          <div className="d-flex gap-2">
            <div className="d-flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#2C9BB3"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <p className="font-heading text-muted mb-0">{supTripLocality}</p>
            </div>
          </div>

          {deleteTrip && (
            <Button
              onClick={(e) => deleteTrip(e, id)}
              className="bg-transparent border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#2C9BB3"
                className="bi bi-trash3 align-item-end"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </Button>
          )}
        </div>
        <Link to={`/${id}`} className="text-decoration-none ">
          <Card.Title>
            <h5 className="display-5 font-title">{supTripName}</h5>
          </Card.Title>
        </Link>
        <div className="d-flex flex-column p-0">
          <div className="d-flex gap-2">
            <div className="d-flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#2C9BB3"
                className="bi bi-clock-history"
                viewBox="0 0 16 16"
              >
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              <p className="font-subHeading mb-0 text-muted">{supTripHour}</p>
            </div>
            <div className="d-flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6a6d6b"
                className="bi bi-calendar-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              <small className="font-heading fst-italic text-muted mb-0 ">
                {new Date(supTripDate).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </small>
            </div>
          </div>
          <div className="d-flex justify-content-start flex-column">
            <small className="fw-bold">People on this trip</small>
            <div className="d-flex gap-4">
              <div>
                <Badge pill className="bg-secondary text-white">
                  {atendees.length}
                </Badge>
              </div>
              <p className="fw-light">
                {atendeesNames.length !== 0
                  ? atendeesNames.map((atendeeName, i, atendeesNames) =>
                      i === atendeesNames.length - 1
                        ? `${atendeeName}. `
                        : `${atendeeName}, `
                    )
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PaddleTripsItem;
