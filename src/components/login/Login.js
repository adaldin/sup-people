import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // logic
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");
    try {
      await login(user.email, user.password);
      navigate("/profile/userProfile");
    } catch (error) {
      console.log(error.message);
      setLoginError("Correo inválido");
    }
  };
  return (
    <div>
      {loginError && <Alert variant="danger">{loginError}</Alert>}
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
        {/* Sign Up */}
        <div className="d-flex justify-content-center">
          <Link to={"/profile/register"}>New user? Create an Account.</Link>
        </div>
        {/* submit */}
        <Button type="submit" variant="outline-dark">
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
