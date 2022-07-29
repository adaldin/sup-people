import { useContext } from "react";
import { PaddleTripsContext } from "../../context/PaddleTripsContext";

function PaddleTripsList() {
  const context = useContext(PaddleTripsContext);
  console.log(context);

  return <div>hola soc el paddletripslist</div>;
}
export default PaddleTripsList;
