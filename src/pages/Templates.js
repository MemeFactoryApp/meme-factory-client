import axios from "axios";
import { useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import Search from "../components/Search";


function Templates() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const [templates, setTemplates] = useState([]);
  const [query, setQuery] = useState('');

  const filteredTemplates = templates.filter((template) => {
    return template.name.toLowerCase().includes(query.toLowerCase());
  });

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
    <>
    <Search query={query} setQuery={setQuery} />
    <div className="grid grid-cols-4 gap-4 grid-flow-row">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
    </div>
    </>
  );
}

export default Templates;
