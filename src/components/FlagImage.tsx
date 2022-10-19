import React from "react";
import { Skeleton, Box } from "@mui/material";

interface FlagImageProps {
  code?: string;
  width?: 20 | 40 | 80 | 160 | 320 | 640 | 1280 | 2560;
}

export const FlagImage: React.FC<FlagImageProps> = (props) => {
  const { code, width = 640 } = props;
  const [loaded, setLoaded] = React.useState(true);

  return (
    <Box sx={{ display: "inline-block", width: "100%" }}>
      {!loaded || !code ? (
        <Skeleton
          sx={{
            width: "100%",
            paddingTop: "61.8%", // To have a golden ratio
            borderRadius: "10px",
          }}
          variant="rectangular"
        />
      ) : null}
      {!code ? null : (
        <div
          style={{
            width: "100%",
            borderRadius: "10px",
            display: loaded ? "block" : "none",
            maxHeight: "30vh",
            content: `url(https://flagcdn.com/w${width}/${code}.png)`,
          }}
        ></div>
      )}
    </Box>
  );
};

// To improve img position https://stackoverflow.com/questions/56729427/how-do-you-center-image-inside-square-aspect-ratio-and-maintain-responsiveness
