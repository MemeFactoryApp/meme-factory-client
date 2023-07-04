import axios from "axios";
import { useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";

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
    <div className="ProjectListPage">
      <Grid justify="space-around">
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
