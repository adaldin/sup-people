import logo from "../../assets/board-blue.svg";
import "./splash.css";
function Splash() {
  return (
    <div className="d-flex justify-content-center align-items-center position-absolute top-0 start-0 h-100 splash__container">
      <div className="logo__container" style={{ width: "30%", heigth: "100%" }}>
        <img src={logo} alt="sup-people-logo" className="img-fluid" />
      </div>
    </div>
  );
}
export default Splash;
