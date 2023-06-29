import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function CreateMeme(){

    const API_URL = "http://localhost:5005"
    const [template, setTemplate] = useState([]);
    const { id } = useParams()
   
    const getTemplateDetails = () => {
      axios
        .get(`${API_URL}/api/templates/${id}`)
        .then((response) => { 
            // console.log(response.data)})
            setTemplate(response.data)})
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getTemplateDetails();
    }, [] );

return(
    <h1>{template.name}HI!</h1>
)

}

export default CreateMeme