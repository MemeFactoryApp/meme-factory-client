import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MemeCard from "../components/MemeCard";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditGroupPage() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const { groupId } = useParams();
  const [group, setGroup] = useState([]);
  const [memes, setMemes] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([{ user: "" }]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleGroupName = (e) => setGroupName(e.target.value);
  const handleAddUser = () => {
    setUsers([...users, { user: "" }]);
  };

  const handleDelete = (i) => {
    const deleteVal = [...users];
    deleteVal.splice(i, 1);
    setUsers(deleteVal);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...users];
    onChangeVal[i][name] = value;
    setUsers(onChangeVal);
  };

  const handleGroupUpdate = (e) => {
    e.preventDefault();

    const requestBody = {
      groupName,
      users: users.filter((user) => user.user !== ""),
    };

    axios
      .put(`${API_URL}/api/groups/edit/${groupId}`, requestBody)
      .then((response) => {
        navigate(`/groups/${groupId}`);
      });
  };

  const getGroup = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setGroup(response.data.group);
        setGroupName(response.data.group.groupName);
        console.log(`This is response.data.group: `, response.data.group);
        console.log(
          `+ this is response.data.group.users: `,
          response.data.group.users
        );

        setUsers(response.data.group.users);
        console.log(`These are the users in the group: `, users);
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
        Edit Group
      </Typography>
      <p>Edit Group: {group.groupName}</p>

      <form onSubmit={handleGroupUpdate} autoComplete="off">
        <div className="center flex-col lg:bg-white-200 ">
          <Input
            type="text"
            size="md"
            label="Group Name"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          {users.map((singleUser, index) => (
            <div key={index}>
              <Input
                type="text"
                name="user"
                size="lg"
                autocomplete="off"
                value={singleUser.user}
                onChange={(e) => handleChange(e, index)}
              />
              {users.length - 1 === index && (
                <span>
                  <button onClick={handleAddUser}>Add User</button>
                </span>
              )}
              <div>
                {users.length > 1 && (
                  <button type="button" onClick={handleDelete}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <Button type="submit">Save Changes</Button>{" "}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}

export default EditGroupPage;