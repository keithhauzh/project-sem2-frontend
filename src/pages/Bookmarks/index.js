import Header from "../../components/Header";
import SidebarButton from "../../components/SidebarButton";

import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function BookmarksPage() {
  const backgroundColor = blue[100];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: { backgroundColor },
      }}
    >
      <SidebarButton />
      <Header title="Bookmarks" />
    </Box>
  );
}
