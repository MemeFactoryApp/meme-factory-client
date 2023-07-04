import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

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
        console.log(
          "response >>>>>",
          response.data,
          "previoustyemplate >>>>>",
          template
        );
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
    createMeme(newMeme);
  };

  const createMeme = (newMeme) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/api/create`, newMeme, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1>Create new Me-me</h1>
      <h1>{template.name}</h1>
      <img src={template.example.url} />
      <form onSubmit={handleSubmit}>
        {Object.values(input).map((element, index) => {
          return (
            <input
              key={index}
              type="text"
              name={index}
              value={element}
              onChange={changeInput}
            />
          );
        })}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <Button onClick={handleSubmit}>Create</Button>
      </form>
    </>
  );
}

export default CreateMeme;