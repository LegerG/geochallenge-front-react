import { Box } from "@mui/material";
import React from "react";

interface PopoverWrapperProps {
  children?: React.ReactNode;
}

export function PopoverWrapper(props: PopoverWrapperProps) {
  const { children } = props;

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: "white",
        maxWidth: "80%",
      })}
    >
      {children}
    </Box>
  );
}
