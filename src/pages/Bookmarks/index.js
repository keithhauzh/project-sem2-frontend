import SidebarButton from "../../components/SidebarButton";
import PostCard from "../../components/PostCard";
import Header from "../../components/Header";
import { getUserToken, isUserLoggedin } from "../../utils/api_auth";
import { getBookmarkedPosts } from "../../utils/api_posts";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { Box, Container, Paper, Button } from "@mui/material";

export default function Bookmarks() {
  const navigate = useNavigate();

  const [cookie] = useCookies(["currentUser"]);
  const loggedUser = isUserLoggedin(cookie);
  const token = getUserToken(cookie);

  const [page, setPage] = useState(1);
  const [interest, setInterest] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!loggedUser) {
      toast.error("Please login first!");
      navigate("/login");
    }
  }, [loggedUser]);

  useEffect(() => {
    // console.log(token);
    if (loggedUser) {
      getBookmarkedPosts(interest, page, token).then((data) => {
        // console.log(data);
        setPosts(data);
      });
    } else {
      toast.error("You are not logged in!");
    }
  }, [interest, page, token, loggedUser]);

  const refreshAlong = () => {
    getBookmarkedPosts(interest, page, token).then((data) => {
      setPosts(data);
      setInterest("");
      navigate("/bookmarks");
    });
  };

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

      <Container>
        <Paper elevation={5} sx={{ marginTop: "50px", padding: "25px" }}>
          {posts && posts.length > 0 ? (
            posts.map((post) => {
              return (
                <Box key={post._id}>
                  <PostCard
                    loggedUser={loggedUser}
                    post={post}
                    refreshAlong={refreshAlong}
                  />
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "50px",
                fontWeight: "bold",
              }}
            >
              No Bookmarked Posts :(
            </Box>
          )}

          {/* pagination section */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              padding: "20px 0 40px 0",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              disabled={page === 1 ? true : false}
              onClick={() => setPage(page - 1)}
            >
              <ArrowLeft />
              Prev
            </Button>
            <span>Page {page}</span>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setPage(page + 1)}
            >
              Next
              <ArrowRight />
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
