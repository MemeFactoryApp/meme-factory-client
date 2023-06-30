import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CreateMeme() {
  const API_URL = "http://localhost:5005";
  const [template, setTemplate] = useState(null);
  const { id } = useParams();

  const getTemplateDetails = () => {
    axios
      .get(`${API_URL}/api/templates/${id}`)
      .then((response) => {
        setTemplate(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTemplateDetails();
  }, []);

  /*   console.log("template", template);
  console.log("example", template.example);
  console.log(template?.example?.text); */

  if (!template) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>HI!</h1>
      <h1>{template.name}</h1>
      {template.example.text.map((element) => {
        return <div key={element}>{element}</div>;
      })}
    </>
  );
}

export default CreateMeme;
