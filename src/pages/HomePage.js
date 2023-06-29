import axios from 'axios';
import { useEffect, useState } from 'react';
import TemplateCard from '../components/TemplateCard';


function HomePage(){
    const API_URL = "https://localhost:5005"
    const [templates, setTemplates] = useState([]);
  
    const getAllTemplates = () => {
      axios
        .get(`${API_URL}/templates`)
        .then((response) => 
        setTemplates(response.data))
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getAllTemplates();
    }, [] );
  
    
    return (
      <div className="ProjectListPage">
        { templates.map((template) => (
          <TemplateCard key={template._id} {...template} />
        ))}       
      </div>
    );
}

export default HomePage


    