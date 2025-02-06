import { Box, Typography } from "@mui/material";
import { getCurrentUser } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

export default function Header(props) {
  const { title = "Home" } = props;
  const [cookie] = useCookies(["currentUser"]);
  const currentUser = getCurrentUser(cookie);
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
        ~ {title} ~
      </Typography>
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
        Current user:{" "}
        {currentUser && currentUser.name
          ? currentUser.name
          : "Not Logged in :("}
      </Typography>
    </Box>
  );
}
