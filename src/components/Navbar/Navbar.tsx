import { Fragment, useEffect, useState, memo } from "react";
import Link from "next/link";
import content from "../../content";
import Switch from "react-switch";
import { useTheme } from "next-themes";
import { useMeQuery } from "../../generated/graphql";

//Redux
import { isServer } from "../../utils/isServer";
import Dropdown from "./Dropdown";
import { linkNavbar } from "../../styles/global";
import MyIcon from "../Other/MyIcon";
import PlusIcon from "../icons/PlusIcon";
import HomeIcon from "../icons/HomeIcon";
import AuthUserNavLinks from "./AuthUserNavLinks";
import { useColorMode } from "@chakra-ui/react";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [activeNav, setActiveNav] = useState(false);

  const handleScrollPage = () => {
    if (window.scrollY > 60) setActiveNav(true);
    else if (window.scrollY < 60) setActiveNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPage);
    return () => {
      window.removeEventListener("scroll", handleScrollPage);
    };
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      setOpen(true);
    }
  }, []);

  const handleChange = () => {
    setOpen(!open);
    setTheme(theme === "light" ? "dark" : "light");
    toggleColorMode();
  };

  let body = null;
  if (data?.me) {
    body = (
      <Fragment>
        <AuthUserNavLinks />
        <Dropdown user={data.me} />
      </Fragment>
    );
  } else if (!data?.me && !fetching)
    body = (
      <>
        {content.nav.links.map((link, index) => (
          <Link key={index} href={link.to}>
            <a tabIndex={0} className={linkNavbar}>
              {link.text}
            </a>
          </Link>
        ))}
      </>
    );

  return (
    <div
      className={`sticky  top-0 z-50 transition-colors  duration-700 ${
        activeNav
          ? "bg-gray-200 dark:bg-gray-darkNav shadow-sm"
          : "bg-gray-100 dark:bg-transparent shadow-sm"
      }`}
    >
      <div
        className={`flex items-center justify-between w-10/12 mx-auto py-5 dark:text-white  font-roboto ${
          activeNav && "text-black"
        }`}
      >
        <Link href="/">
          <button className="text-xl font-bold">{content.nav.logo}</button>
        </Link>
        <div className="flex items-center">
          {body}
          <Switch
            onColor="#4D46BF"
            offHandleColor="#D0D3D4"
            width={50}
            height={25}
            checkedIcon={
              <span className="flex justify-center themeButtonTransform">
                <SunIcon />
              </span>
            }
            handleDiameter={20}
            uncheckedIcon={
              <span className="flex justify-center themeButtonTransform">
                <MoonIcon />
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

export default Navbar;
