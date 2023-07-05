import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Card
      color="transparent"
      className="flex items-center justify-center"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to Login.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleLoginSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" value={email} onChange={handleEmail} />
          <Input
            type="password"
            size="lg"
            label="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <Button className="mt-6" fullWidth type="submit">
          Login
        </Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account? <Link to="/signup">Signup here</Link>
        </Typography>
      </form>
    </Card>
  );
}

export default LoginPage;
