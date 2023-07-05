import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MemeCard from "../components/MemeCard";

function GroupDetails() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const { id } = useParams();
  const [group, setGroup] = useState([]);
  const [memes, setMemes] = useState([]);

  const getGroup = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/groups/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setGroup(response.data.group);
        setMemes(response.data.memes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGroup();
  }, []);

  console.log(group);

  return (
    <>
      <p>Group Details</p>

      <p>Group Name: {group.groupName}</p>

      {memes.length &&
        memes.map((meme) => {
          return <img src={meme.url}></img>;
        })}

      {/*  <div class="grid grid-cols-4 gap-4"></div> */}

      {/*         {memes.map((element) => {
          return { element.memes};
        })} */}

      {/*  {group.map((meme) => {
          return <MemeCard key={meme.id} {...meme } />;
        })} */}
    </>
  );
}

export default GroupDetails;
