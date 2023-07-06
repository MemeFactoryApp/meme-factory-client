import { Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function AddMemesToGroup() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [selectedMemes, setSelectedMemes] = useState([]);
  const [memes, setMemes] = useState([]);
  const { groupId } = useParams();
  const navigate = useNavigate();

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
  console.log(selectedMemes)

  useEffect(() => {
    getAllMemes();
  }, []);

  const handleAddMemes = (e) => {
    e.preventDefault();

//   const requestBody = {
//    memes: selectedMemes
//   };

  axios
  .put(`${API_URL}/api/groups/${groupId}/addMemes`, {memes:selectedMemes})
  .then((response) => {
    navigate(`/groups/${groupId}`);
  });
}


  return (
    <form onSubmit={handleAddMemes}>
      <section class="bg-white-100 dark:bg-white-900 py-10 px-12">
        <div class="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {memes.map((element, index) => {
            console.log(element._id);
            return (
              <div
                class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                key={index}
                className={
                  selectedMemes.includes(element._id)
                    ? "bg-red-200 w-72"
                    : "bg-white w-72"
                }
              >
                <article class="overflow-hidden rounded-lg shadow-lg">
                  <img
                    class="block h-auto w-full p-3"
                    src={element.url}
                    className={
                      selectedMemes.includes(element._id)
                        ? "bg-red-200"
                        : "bg-white"
                    }
                    onClick={() => selectMeme(element._id)}
                  ></img>
                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">{element.title}</h1>
                  </header>
                  <footer class="flex items-center justify-between leading-none p-2 md:p-4"></footer>
                </article>
              </div>
            );
          })}
        </div>
      </section>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default AddMemesToGroup;
