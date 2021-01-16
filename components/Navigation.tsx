import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import content from "../content";
import Switch from "react-switch";
import { useTheme } from "next-themes";

interface Props {}

const Navigation = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      setOpen(true);
    }
  }, []);

  const handleChange = () => {
    setOpen(!open);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={{ background: "#1E1E1E" }}>
      <div className="flex items-center justify-between shadow-lg w-10/12 mx-auto py-5 text-white font-dosis">
        <h1 className="text-2xl font-bold">{content.nav.logo} </h1>
        <div className="flex items-center">
          {content.nav.links.map((link, index) => (
            <Link key={index} className="text-xl mr-4" to={link.to}>
              {link.text}
            </Link>
          ))}
          <Switch
            onColor="#4D46BF"
            offHandleColor="#D0D3D4"
            // #4D46BF
            checkedIcon={
              <span className="flex items-center justify-center">
                {" "}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
            }
            uncheckedIcon={
              <span className="flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </span>
            }
            onChange={handleChange}
            checked={open}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
