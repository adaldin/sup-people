import logo from "../../../assets/board-blue.svg";
import "./loader.css";
function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center loader--container">
      <div
        className="d-flex justify-content-center"
        style={{ width: "200px", heigth: "200px" }}
      >
        <img src={logo} alt="logo" className="opacity-50 w-50" />
      </div>
    </div>
  );
}
export default Loader;
