import { Typography, Input } from "@material-tailwind/react";
function Search(props) {

  return (
    <>
       <Typography variant="large" color="blue-gray" className="font-semibold ...(truncated)">
        Search</Typography>
        <div className="m-6">
      <Input value={props.query} type="search" onChange={e => 
        {props.setQuery(e.target.value)}
      } /></div>
    </>
  );
}

export default Search;
