import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";
import GroupMemeCard from "../components/GroupMemeCard";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function GroupDetails() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const { groupId } = useParams();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState([]);
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/groups/${groupId}/delete`)
      .then(() => {
        navigate("/groups");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography className="m-3" variant="h4" color="blue-gray">
        Group Details
      </Typography>
      <Link to={`/groups/${groupId}/addMemes`}>
        <Button className="m-3" variant="outlined" color="purple">
          Add Memes to this Group
        </Button>
      </Link>
      <p>Group Name: {group.groupName}</p>
      <p>
        <Link to={`/groups/edit/${groupId}`}>
          <button className="bg-blue-gray-100">Edit</button>
        </Link>
      </p>
      <div class="grid grid-cols-4 gap-4">
        {memes.map((meme) => {
          return <GroupMemeCard key={meme.id} {...meme} getGroup={getGroup} />;
        })}
      </div>
      {group.createdBy === user?._id && (
        <Button type="button" onClick={handleDelete}>
          Delete Group
        </Button>
      )}
    </>
  );
}

export default GroupDetails;
