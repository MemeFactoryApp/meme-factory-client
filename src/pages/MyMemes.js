import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
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
    <>
    <Typography className="m-3" variant="h4" color="blue-gray">
        My Memes
      </Typography>
    <div class="grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {memes.map((meme) => {
    return(
      <MemeCard key={meme.id} {...meme} getAllMemes={getAllMemes}/>
    )
  })}  
 </div>
 </>
  )
}

export default MyMemes;
