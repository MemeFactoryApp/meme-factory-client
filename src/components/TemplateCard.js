import { Link } from "react-router-dom";

function TemplateCard ( { name, id } ) {
  
  return (
    <div className="TemplateCard card">
      <Link to={`/templates/${id}`}>
        <h3>{name}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{name} </p>
    </div>
  );
}

export default TemplateCard;