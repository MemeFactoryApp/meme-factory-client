import axios from "axios";
import { useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";


function HomePage() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const [templates, setTemplates] = useState([]);

  const getAllTemplates = () => {
    axios
      .get(`${API_URL}/api/templates`)
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <div class="grid grid-cols-4 gap-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
    </div>
  );
}

export default HomePage;
