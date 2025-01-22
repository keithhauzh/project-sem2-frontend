import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function CommentsPage() {
  const backgroundColor = blue[100];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: { backgroundColor },
      }}
    ></Box>
  );
}
