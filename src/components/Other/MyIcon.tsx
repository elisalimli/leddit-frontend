import React from "react";
import { IconButton } from "@chakra-ui/react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

interface Props {
  onClick?: any;
  active?: boolean;
  toolTipText: string;
  isLoading?: boolean;
  color?: string | undefined;
  isRound?: boolean;
  activeBackground?: string | undefined;
}

const MyIcon: React.FC<Props> = ({
  children,
  onClick,
  active,
  toolTipText,
  isLoading,
  isRound = true,
  color = undefined,
  activeBackground = undefined,
}) => {
  return (
    <Tippy content={toolTipText}>
      <IconButton
        isLoading={isLoading}
        size="sm"
        transition="ease-in-out"
        background={active ? null : activeBackground}
        transitionDuration="300ms"
        isRound={isRound}
        aria-label={toolTipText}
        onClick={onClick}
        colorScheme={color}
        icon={children as any}
      />
    </Tippy>
  );
};

export default MyIcon;
