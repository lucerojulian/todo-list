import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
