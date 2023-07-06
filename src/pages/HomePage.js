import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Button,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function HomePage() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const [memes, setMemes] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const getAllMemes = () => {
    axios
      .get(`${API_URL}/api/userMemes`)
      .then((response) => {
        setMemes(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllMemes();
  }, []);

  return (
    <>
      <div>
      </div>
      <div className="w-full lg:p-8 p-4 flex items-center justify-between">
  <div className="lg:w-[40%] w-full lg:block hidden ">
    <Carousel
      className="rounded-xl flex items-center"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {memes.map((meme) => (
        <img
          src={meme.url}
          alt="meme"
          className="flex p-2 items-center justify-center rounded-xl"
        />
      ))}
    </Carousel>
  </div>
  <div className="lg:w-[60%] w-full lg:px-6 lg:pl-10">
    <Typography className="text-3xl ...(truncated)">
    Welcome to MemeFactory
    </Typography>
    <Typography className="font-poppins mb-6">
    Where Humour is Manufactured
    </Typography>
    {isLoggedIn ? <Link to="/templates"><Button size="lg"  color="purple">
      Create your own meme
    </Button></Link>
    : <Link to="/login"><Button size="lg" to="/login" color="purple">
    Create your own meme
  </Button></Link>}
  </div>
</div>

    </>
  )
}


export default HomePage;