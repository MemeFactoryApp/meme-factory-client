import axios from "axios";
import { useEffect, useState } from "react";

function GroupDetails() {
  const API_URL = process.env.REACT_API_URL || "http://localhost:5005";
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

  return (<>
  {memes.map((element) => {
    return(
     <img src={element.url}></img>
    )
  })}
  </>)
}

export default GroupDetails;
