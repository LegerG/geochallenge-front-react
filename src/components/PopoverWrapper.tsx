import { Box } from "@mui/material";
import React from "react";

interface PopoverWrapperProps {
  direction?: "row" | "column";
  children?: React.ReactNode;
}

export const PopoverWrapper: React.FC<PopoverWrapperProps> = (props) => {
  const { children, direction } = props;

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        shadowBox: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        direction: direction ?? "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      })}
    >
      {children}
    </Box>
  );
};
