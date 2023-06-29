import { Link } from "react-router-dom";
import CreateMeme from "../pages/CreateMeme";

function TemplateCard (props) {
  
  return (
    <div className="TemplateCard card">
      <Link to={`/templates/${props.id}`} element={<CreateMeme />}>
        <h3>{props.name}</h3>
      <img src={props.example.url} alt="meme"></img>
      </Link>
    </div>
  );
}

export default TemplateCard;