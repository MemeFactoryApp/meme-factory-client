import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function GroupsPage() {
  const API_URL = "http://localhost:5005";
  const { id } = useParams();
  const [groups, setGroups] = useState([]);

  const getGroups = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/groups/${id}`, {
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
      <p>
        <button>Create New Group</button>
      </p>

      <p>Groups that I belong to:</p>
    </>
  );
}

export default GroupsPage;