import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";
import GroupMemeCard from "../components/GroupMemeCard";
import { AuthContext } from "../context/auth.context";

function GroupDetails() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const { groupId } = useParams();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState([]);
  const [memes, setMemes] = useState([]);

  const getGroup = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/groups/${groupId}`, {
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

  console.log(group.users);

  return (
    <>
      <Typography variant="large" color="blue-gray" className="p-1 font-normal">
        Group Details
      </Typography>
      <p>Group Name: {group.groupName}</p>
      <p>
        <Link to={`/groups/edit/${groupId}`}>
          <button className="bg-blue-gray-100">Edit</button>
        </Link>
      </p>
      <div class="grid grid-cols-4 gap-4">
        {memes.length &&
          memes.map((meme) => {
            return <GroupMemeCard key={meme.id} {...meme} getGroup={getGroup}/>;
          })}
      </div>
      {group.createdBy === user?._id && <Button>Delete Group</Button>}
    </>
  );
}

export default GroupDetails;
