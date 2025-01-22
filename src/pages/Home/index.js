import SidebarButton from "../../components/SidebarButton";
import AddPostCard from "../../components/AddPostCard";
import PostCard from "../../components/PostCard";
import Header from "../../components/Header";

import { blue } from "@mui/material/colors";
import { Box, Container, Paper } from "@mui/material";

export default function Home(title) {
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

      <Header title="Home" />

      <Container>
        <AddPostCard />

        <Paper elevation={5} sx={{ marginTop: "50px", padding: "25px" }}>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Paper>
      </Container>
    </Box>
  );
}
