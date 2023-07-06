import axios from "axios";
import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function MemeCard(props) {

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  const deleteMeme = () => {
    const id = [props._id];
    axios
      .delete(`${API_URL}/api/memes/${id}/delete`)
      .then(() => {
        props.getAllMemes()
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
          <Button variant="outlined" color="purple" onClick={deleteMeme}>Delete Meme</Button>
      </CardFooter>
    </Card>
  );
}

export default MemeCard;
