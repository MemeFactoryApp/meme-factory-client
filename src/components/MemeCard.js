import { Link } from "react-router-dom";
import CreateMeme from "../pages/CreateMeme";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function MemeCard(props) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={props.url} alt="img-blur-shadow" layout="fill" />
      </CardHeader>
      <CardBody>
        <Typography>{props.name}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Delete Meme</Button>
      </CardFooter>
    </Card>
  );
}

export default MemeCard;
