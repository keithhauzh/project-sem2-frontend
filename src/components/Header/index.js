import { Box, Typography } from "@mui/material";

export default function Header(props) {
  const { title = "Home" } = props;
  return (
    <Box>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
        variant="h1"
      >
        ~~ {title} ~~
      </Typography>
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
        Current user: User
      </Typography>
    </Box>
  );
}
