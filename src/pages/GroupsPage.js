import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

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

  const TABLE_HEAD = ["Group Name", "Number of Memes", "Number of Users", ""];

  return (
    <>
      <Typography className="m-3" variant="h4" color="blue-gray">
        My Groups
      </Typography>
      <Link to={`/groups/create`}>
        <Button className="m-3" variant="outlined" color="purple">
          Create New Group
        </Button>
      </Link>

      <Card className="overflow-scroll h-full w-full m-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((element, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {element.groupName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {element.memes.length}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {element.users.length}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue"
                    className="font-medium"
                  >
                    <Link to={`/groups/${element._id}`}>
                      <button className="bg-blue-gray-100">Details</button>
                    </Link>
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default GroupsPage;
