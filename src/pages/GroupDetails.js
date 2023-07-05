import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MemeCard from "../components/MemeCard";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

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
      <Typography variant="large" color="blue-gray"
        className="p-1 font-normal">Group Details</Typography>
      <p>Group Name: {group.groupName}</p>
      <div class="grid grid-cols-4 gap-4">
        {memes.length &&
          memes.map((meme) => {
            return(
            <MemeCard key={meme.id} {...meme} />
            )
          })}
      </div>
    </>
  );
}

export default GroupDetails;
