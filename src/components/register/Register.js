import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
  });
  const [registerError, setRegisterError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  //   logic
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");
    try {
      await signUp(user.email, user.password);
      navigate("/profile/");

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
        fname: user.fName,
        lName: user.lName,
        password: user.password,
        timeStamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      if (
        error.code === "auth/email-already-in-use" ||
        error.code === "auth/internal-error"
      )
        setRegisterError("Correo inválido");
    }
  };

  return (
    <div>
      {registerError && <Alert variant="danger">{registerError}</Alert>}
      <form onSubmit={handleSubmit} className="d-flex flex-column p-2 gap-2">
        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="user@mail.com"
        />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="******"
        />
        {/* name */}
        <label htmlFor="fName">First name</label>
        <input
          type="text"
          id="fName"
          name="fName"
          onChange={handleChange}
          placeholder="Michael"
        />
        {/* lastName */}
        <label htmlFor="lName">Last name</label>
        <input
          type="text"
          id="lName"
          name="lName"
          onChange={handleChange}
          placeholder="Scott"
        />
        {/* Sign Up */}
        <div className="d-flex justify-content-center">
          <Link to={"/profile"}>Alredy registered? Log in.</Link>
        </div>
        {/* submit */}
        <Button type="submit" variant="outline-dark">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
