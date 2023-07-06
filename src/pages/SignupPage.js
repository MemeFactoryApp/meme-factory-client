import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Card color="transparent" className="flex items-center justify-center" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSignupSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" value={name} onChange={handleName} />
          <Input size="lg" label="Email" value={email} onChange={handleEmail} />
          <Input
            type="password"
            size="lg"
            label="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="https://api.memegen.link/images/agnes/_/i_have_read_and_agree_to_the_terms_and_conditions.png"
                target="_blank"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth type="submit">
          Register
        </Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </form>
    </Card>
  );
}

export default SignupPage;
