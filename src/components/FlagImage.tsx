import React, { CSSProperties } from "react";
import { Skeleton, Box, Dialog, Typography, Grid } from "@mui/material";
import { AnswerPopover } from "./";

interface FlagImageProps {
  code?: string;
  width?: 20 | 40 | 80 | 160 | 320 | 640 | 1280 | 2560;
  popoverElement?: React.ReactNode;
  popoverOpen?: boolean;
}

export function FlagImage(props: FlagImageProps) {
  const { code, width = 640, popoverOpen, popoverElement } = props;

  const imgStyle = {
    position: "absolute",
    display: "block",
    width: "100%",
    height: "100%", // To have a golden ratio
    objectFit: "contain",
  } as CSSProperties;

  return (
    <Box
      sx={{
        display: "inline-block",
        width: "100%",
        position: "relative",
        pb: "61.8%",
        bgcolor: "grey.300",
      }}
    >
      {!code ? <Skeleton sx={imgStyle} variant="rectangular" /> : null}
      {!code ? null : (
        <img
          style={imgStyle}
          src={`https://flagcdn.com/w${width}/${code}.png`}
        />
      )}
      {popoverOpen ? (
        <Grid
          sx={{ ...imgStyle, zIndex: 1, display: "flex" }}
          container
          alignItems="center"
          justifyContent="center"
        >
          {popoverElement}
        </Grid>
      ) : null}
    </Box>
  );
}
