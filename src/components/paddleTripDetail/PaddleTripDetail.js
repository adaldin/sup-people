import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTodaySupTrips } from "../../services/APIService";
function PaddleTripDetail() {
  const { id } = useParams();
  const [today, setToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrip, setCurrentTrip] = useState({});
  // console.log(id);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await getTodaySupTrips();
      setToday(response);
      setLoading(false);
      // console.log(response);
    }
    getData();
  }, []);

  return (
    <div>
      aqui todaytrip.id== id params
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        today.find((i) => (i.id == id ? <p>{i.supTripName}</p> : "notFounded"))
      )} */}
    </div>
  );
}
export default PaddleTripDetail;
