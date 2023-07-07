import { Input, Button, Card } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([{ user: "" }]);
  const [memes, setMemes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [selectedMemes, setSelectedMemes] = useState([]);

  const navigate = useNavigate();
  const selectMeme = (memeId) => {
    const isSelected = selectedMemes.includes(memeId);

    isSelected
      ? setSelectedMemes(selectedMemes.filter((element) => element !== memeId))
      : setSelectedMemes([...selectedMemes, memeId]);
  };

  const handleGroupName = (e) => setGroupName(e.target.value);
  const handleAddUser = () => {
    setUsers([...users, { user: "" }]);
  };

  const handleDelete = (i) => {
    const deleteVal = [...users];
    deleteVal.splice(i, 1);
    setUsers(deleteVal);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...users];
    onChangeVal[i][name] = value;
    setUsers(onChangeVal);
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

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      groupName: groupName,
      users: users.filter((user) => user.user !== ""),
      memes: selectedMemes,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/groups/create`, newGroup, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        navigate("/groups");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <h1>Create a new Group</h1>
      <form onSubmit={handleGroupSubmit} autocomplete="off">
        <section className="flex items-center justify-center">
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="m-4">
            <Input
            className="p-2"
              type="text"
              size="lg"
              label="Group Name"
              value={groupName}
              onChange={handleGroupName}
            /></div>
            <label>
              {users.map((singleUser, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    size="lg"
                    name="user"
                    label="User email"
                    autocomplete="off"
                    value={singleUser.user}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {users.length - 1 === index && (
                    <span>
                      <button onClick={handleAddUser}>Add User</button>
                    </span>
                  )}
                  <div>
                    
                    {users.length > 1 && (
                      <button type="button" onClick={handleDelete}>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </label>
          </div>
        </section>
          <section class="bg-white-100 dark:bg-white-900 py-10 px-12">
            <div class="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {memes.map((element, index) => {
                console.log(element._id);
                return (
                  <Card
                    class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                    key={index}
                    className={
                      selectedMemes.includes(element._id)
                        ? "bg-green-200 w-72"
                        : "bg-white w-72"
                    }
                    onClick={() => selectMeme(element._id)}
                  >
                    <article class="overflow-hidden rounded-lg">
                      <img
                        class="block h-auto w-full p-3"
                        src={element.url}
                      ></img>
                      <header class="flex items-center justify-between leading-tight p-2 md:p-4"
                      >
                        <h1 class="text-lg">{element.title}</h1>
                      </header>
                      <footer class="flex items-center justify-between leading-none p-2 md:p-4"></footer>
                    </article>
                  </Card>
                );
              })}
            </div>
          </section>
          <Button type="submit">Create Group</Button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </>
  );
}

export default CreateGroup;
