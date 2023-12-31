import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
 
function MyNavbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
         <Link to="/">
        <button>Home</button>
      </Link>
      </Typography>
        {isLoggedIn && (
        <>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/templates">
            <button>Create Meme</button>
          </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/memes">
            <button>My Memes</button>
          </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/groups">
            <button>My Groups</button>
          </Link>
      </Typography>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      ><Link to="/login">
      <button onClick={logOutUser}>Logout </button>
        </Link>
        </Typography>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-0 font-normal"
      > <span>Wassup, &nbsp;<i>{user && user.name}</i></span>
        </Typography>

        </>
      )}
      
      {!isLoggedIn && (
        <><Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          </Typography>
          <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
          </Typography>
        </>
      )}
    </ul>
  );
 
  return (
    <>
      <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 mb-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            MemeFactory
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
        </Collapse>
      </Navbar>
    </>
  );
}

export default MyNavbar;
