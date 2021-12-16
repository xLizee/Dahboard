import { useRouter } from "next/router";

/**
 * This is the SideBar of Dashboard.
 */
const SideBar = (props) => {
  const router = useRouter();

  const handleAbout = (e) => {
    e.preventDefault();
    props.toggle();
    router.push("/about.json");
  };

  const handleHome = (e) => {
    e.preventDefault();
    props.toggle();
    router.push("/");
  };

  return (
    <aside
      className={
        props.isOpen
          ? "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
          : "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 -translate-x-full"
      }
    >
      <span
        onClick={props.toggle}
        className="flex items-center ml-4 p-2 border-b h-20"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-8 h-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </span>
      <span
        onClick={handleHome}
        className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
      >
        <span className="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </span>
        <span>Home</span>
      </span>
      <span
        onClick={props.toggleModal}
        className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
      >
        <span className="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
        </span>
        <span>New Widget</span>
      </span>
      <span
        onClick={handleAbout}
        className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
      >
        <span className="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </span>
        <span>About</span>
      </span>
    </aside>
  );
};

export default SideBar;
