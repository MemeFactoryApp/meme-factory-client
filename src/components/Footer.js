import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="bg-white sticky bottom-0 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        <Typography>© 2023 Copyright: &nbsp;MemeFactoryApp</Typography>
      </div>
      <div className="p-4 flex justify-center text-center text-neutral-700 dark:text-neutral-200">
        Made with &nbsp;
        <svg
          className="flex justify-center w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>{" "}
        &nbsp;by &nbsp;
        <p className="text-neutral-800 dark:text-neutral-400"> Jani & Emily</p>
      </div>
    </footer>
  );
}

export default Footer;
