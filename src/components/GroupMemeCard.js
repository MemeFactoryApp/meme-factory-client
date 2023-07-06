import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext, useEffect } from "react";

function GroupMemeCard(props) {
  const { groupId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  const deleteMeme = () => {
    const id = [props._id];
    console.log(groupId)
    axios
      .delete(`${API_URL}/api/groups/${groupId}/memes/${id}/delete`)
      .then(() => {
        props.getGroup()
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="mt-6 w-72 h-[58vh] gap-6">
      <CardHeader color="blue-gray" className="h-auto">
        <img src={props.url} alt="meme template" className="object-cover" />
      </CardHeader>
      <CardFooter className="pt-6">
        <Typography>{props.title}</Typography>
        {user._id === props.createdBy && (
          <Button variant="outlined" color="purple" onClick={deleteMeme}>Delete Meme from Group</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default GroupMemeCard;
