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


function TemplateCard(props) {
  return (
    <Link to={`/templates/${props.id}`} element={<CreateMeme />}>
    <Card className="mt-6 w-72 h-[58vh] gap-6">
          <CardHeader color="blue-gray" className="h-auto">
            <img src={props.example.url} alt="meme template" className="object-cover" />
          </CardHeader>
          <CardFooter className="pt-6">
            <Typography>{props.name}</Typography>
            <Button>Use Template</Button>
          </CardFooter >
        </Card>
        </Link>
  );
}


export default TemplateCard;
