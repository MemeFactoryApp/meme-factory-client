import { Grid } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import MemeCard from "../components/MemeCard";

function MyMemes() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const [memes, setMemes] = useState([]);

  const getAllMemes = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/memes`, {headers: { Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setMemes(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllMemes();
  }, []);

  return (
  <Grid justify="space-around">
  {memes.map((meme) => {
    return(
      <MemeCard key={meme.id} {...meme} />
    )
  })}  
  </Grid>
  )
}

export default MyMemes;