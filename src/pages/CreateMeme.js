import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input, Button, Card, Typography } from "@material-tailwind/react";

function CreateMeme() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [template, setTemplate] = useState(null);
  const [input, setInput] = useState({});
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  // Set default header. e.g, X-API-KEY
  axios.defaults.headers.common = {
    "X-API-Key": "mequyzi2p0",
  };
  // this function controls our loading state
  const toggleLoadingState = () => {
    setisLoading((current) => !current);
  };

  const getTemplateDetails = () => {
    toggleLoadingState();
    axios
      .get(`${API_URL}/api/templates/${id}`)
      .then((response) => {
        setTemplate(response.data);
        setInput(Object.assign({}, response.data.example.text));
      })
      .catch((error) => console.log(error));
  };

  const changeInput = (e) => {
    setInput((previousInput) => {
      const { name, value } = e.target;
      return {
        ...previousInput,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    getTemplateDetails();
    toggleLoadingState();
  }, []);

  useEffect(() => {
    const requestBody = { text: Object.values(input) };
    axios
      .post(`${API_URL}/api/templates/${id}`, requestBody)
      .then((response) => {
        /* console.log(
          "response >>>>>",
          response.data,
          "previoustemplate >>>>>",
          template
        ); */
        if (!isLoading && template)
          setTemplate((prevTemplate) => {
            const newObj = { ...prevTemplate };
            newObj.example.url = response.data.url;
            return newObj;
          });
      })
      .catch((e) => console.log(e));
  }, [input]);

  if (!template) {
    return <p>loading...</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeme = {
      title: title,
      url: template.example.url,
    };
    const storedToken = localStorage.getItem("authToken");
    console.log("---before axios ---");

    axios
      .post(`${API_URL}/api/create`, newMeme, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("---inside axios axios ---");
        navigate("/memes");
      })
      .catch((e) => console.log(e));
    console.log("---after axios ---");
  };

  //const createMeme = (newMeme) => {};

  return (
    <Card
      color="transparent"
      className="flex items-center justify-center"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Create a new Meme
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        // onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name your new meme"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <img src={template.example.url} />
          {Object.values(input).map((element, index) => {
            return (
              <Input
                size="lg"
                label="Add text to your meme"
                key={index}
                type="text"
                name={index}
                value={element}
                onChange={changeInput}
              />
            );
          })}
        </div>
        <Button
          //to="/memes"
          onClick={handleSubmit}
          className="mt-6"
          fullWidth
          type="submit"
        >
          Create Meme
        </Button>
      </form>
    </Card>
  );
}

export default CreateMeme;
