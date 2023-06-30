import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CreateMeme() {
  const API_URL = "http://localhost:5005";
  const [template, setTemplate] = useState(null);
  const [input, setInput] = useState({});
  const { id } = useParams();

  const getTemplateDetails = () => {
    axios
      .get(`${API_URL}/api/templates/${id}`)
      .then((response) => {
        setTemplate(response.data);
        setInput(Object.assign({}, response.data.example.text))
      })
      .catch((error) => console.log(error));
  };

  const changeInput = (e) => {
    setInput((previousInput) => {
      const {name, value} = e.target
      return {
        ...previousInput, [name]: value 
      }
    });
  };

  useEffect(() => {
    getTemplateDetails();
  }, []);

  useEffect(() => {
    const requestBody = {input}
    axios
    .post(`${API_URL}/api/templates/${id}`, requestBody)
    .then((response) => {
      console.log(response)
    })
    //axios.post --- templates/:id 
    //reset template.example.url(response.data)
    // ...spread previous template - set only example.url 
  }, [input]);



  if (!template) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>HI!</h1>
      <h1>{template.name}</h1>
      <img src={template.example.url} />
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
    </>
  );
}

export default CreateMeme;
