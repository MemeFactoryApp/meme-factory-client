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
      <Typography className="m-3 text-gray-900" variant="h3" color="blue-gray">
        Group Details
      </Typography>
      <Typography className="m-3 text-gray-900" variant="h6">Group name: "{group.groupName}"</Typography>
      <div className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 mb-4">
        <div className="flex items-center justify-between">
        <Link to={`/groups/${groupId}/addMemes`}>
        <Button className="m-3" color="purple">
          Add Memes to this Group
        </Button>
      </Link>
        <Link to={`/groups/edit/${groupId}`}>
          <Button className="m-3 flex justify-end" color="purple">Edit</Button>
        </Link>
      </div>
      </div>
      <div class="grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
