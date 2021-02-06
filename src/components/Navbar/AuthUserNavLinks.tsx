import React, { Fragment, useState } from "react";
import Link from "next/link";
import content from "../../content";
import { linkNavbar } from "../../styles/global";
import { useStore } from "../../utils/hooks/useStore";
import MyIcon from "../Other/MyIcon";

interface Props {}

const AuthUserNavLinks = (props: Props) => {
  const activeLink = useStore((state) => state.activeNavLink);
  const setActiveLink = useStore((state: any) => state.setActiveNavLink);
  return (
    <Fragment>
      {content.nav.signedUserLinks.map((link, index) => (
        <Link key={index} href={link.to}>
          <span
            onClick={() => setActiveLink(link.to)}
            className={`mx-2 ${link.to === activeLink && "text-green-500"}`}
          >
            {link.type === "icon" ? (
              <MyIcon
                activeBackground="transparent"
                toolTipText={link.tooltip}
                active={link.to === activeLink}
              >
                {link.text}
              </MyIcon>
            ) : (
              link.text
            )}
          </span>
        </Link>
      ))}
    </Fragment>
  );
};

export default AuthUserNavLinks;
