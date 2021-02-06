import PlusIcon from "../components/icons/PlusIcon";
import HomeIcon from "../components/icons/HomeIcon";
import MyIcon from "../components/Other/MyIcon";
import Link from "next/link";

export default {
  nav: {
    logo: "LEDDIT",
    links: [
      { text: "Register", to: "/register" },
      { text: "Login", to: "/login" },
    ],
    signedUserLinks: [
      {
        text: <HomeIcon />,
        to: "/",
        type: "icon",
        tooltip: "Home",
      },
      {
        text: <PlusIcon />,
        type: "icon",
        to: "/create-post",
        tooltip: "Create post",
      },
    ],
  },
  inputs: {
    register: [
      {
        textLabel: "Username",
        id: "username",
        type: "text",
        placeholder: "Username",
      },
      {
        textLabel: "Email",
        id: "email",
        type: "text",
        placeholder: "Email",
      },
      {
        textLabel: "Password",
        id: "password",
        type: "password",
        placeholder: "Password",
      },
    ],
    login: [
      {
        textLabel: "Username or Email",
        id: "usernameOrEmail",
        type: "text",
        placeholder: "Username or Email",
      },
      {
        textLabel: "Password",
        id: "password",
        type: "password",
        placeholder: "Password",
      },
    ],
    changePassword: [
      {
        textLabel: "Username or Email",
        id: "usernameOrEmail",
        type: "text",
        placeholder: "Username or Email",
      },
      {
        textLabel: "Password",
        id: "password",
        type: "password",
        placeholder: "Password",
      },
    ],
    createPost: [
      {
        textLabel: "Title",
        id: "title",
        type: "text",
        placeholder: "title...",
      },
      {
        textLabel: "Text",
        id: "text",
        type: "text",
        placeholder: "text...",
        textarea: true,
      },
    ],
  },
};
