import axios from "axios";
import { useEffect, useState } from "react";

function CreateGroup() {    
const API_URL = process.env.REACT_APP_API_URL;
  const [groupName, setGroupName] = useState("");
  const [memes, setMemes] = useState([]);
  const [selectedMemes, setSelectedMemes] = useState([]);

  const selectMeme = (memeId) => {
    const isSelected = selectedMemes.includes(memeId);

    isSelected
      ? setSelectedMemes(selectedMemes.filter((element) => element !== memeId))
      : setSelectedMemes([...selectedMemes, memeId]);
  };

  const getAllMemes = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/memes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setMemes(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllMemes();
  }, []);

  useEffect(() => {
    console.log(selectedMemes);
  }, [selectedMemes]);

  return (
    <div className="center flex-col lg:bg-red-200 ">
      <input type="text" name={groupName} value={groupName} />
      {memes.map((element, index) => {
        console.log(element._id);
        return (
          <div
            key={index}
            className={
              selectedMemes.includes(element._id)
                ? "bg-red-200 w-72 center"
                : "bg-white w-72 center"
            }
          >
            <img
              src={element.url}
              style={{
                maxWidth: 200,
              }}
              className={
                selectedMemes.includes(element._id) ? "bg-red-200" : "bg-white"
              }
              onClick={() => selectMeme(element._id)}
            ></img>
          </div>
        );
      })}
    </div>
  );
}

export default CreateGroup;