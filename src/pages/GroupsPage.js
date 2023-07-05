import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function GroupsPage() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const { id } = useParams();
  const [groups, setGroups] = useState([]);

  const getGroups = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/groups`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <Link to={`/groups/create`}>
        <p>
          <button className="bg-blue-gray-100">Create New Group</button>
        </p>
      </Link>
      <p>
        <br />
        <br />
        <br />

        <p>My Groups</p>

        {groups.map((element) => {
          return (
            <>
              <br />
              <p>
                Group Name: {element.groupName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                No. Of Memes: {element.memes.length}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No. Of Users:{" "}
                {element.users.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/groups/${element._id}`}>
                  <button className="bg-blue-gray-100">Details</button>
                </Link>
              </p>
            </>
          );
        })}
      </p>
    </>
  );
}

export default GroupsPage;
