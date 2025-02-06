import SidebarButton from "../../components/SidebarButton";
import AddPostCard from "../../components/AddPostCard";
import PostCard from "../../components/PostCard";
import Header from "../../components/Header";
import { getPosts } from "../../utils/api_posts";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { Box, Container, Paper, Button, Select, MenuItem } from "@mui/material";
import { isUserLoggedin } from "../../utils/api_auth";
import { getInterests } from "../../utils/api_interests";

export default function Home() {
  const navigate = useNavigate();

  const [cookie] = useCookies(["currentUser"]);
  const loggedUser = isUserLoggedin(cookie);

  const [page, setPage] = useState(1);
  const [interest, setInterest] = useState("");
  const [posts, setPosts] = useState([]);
  const [interests, setInterests] = useState([]);

  const [filterInterest, setFilterInterest] = useState("");

  useEffect(() => {
    getPosts(filterInterest, page).then((data) => {
      // console.log(data);
      setPosts(data);
    });
  }, [filterInterest, page]);

  useEffect(() => {
    getInterests().then((data) => {
      setInterests(data);
    });
  }, [interest]);

  const refreshAlong = () => {
    getPosts(interest, page).then((data) => {
      setPosts(data);
      setInterest("");
      navigate("/");
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

      <Header title="Home" />

      <Container>
        {loggedUser ? <AddPostCard refreshAlong={refreshAlong} /> : null}

        <Paper elevation={5} sx={{ marginTop: "50px", padding: "25px" }}>
          <Select
            label="Interest"
            required
            fullWidth
            value={filterInterest}
            onChange={(event) => {
              // console.log(filterInterest);
              setFilterInterest(event.target.value);
            }}
          >
            {interests.map((interest) => {
              return <MenuItem value={interest._id}>{interest.name}</MenuItem>;
            })}
          </Select>

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
              No Posts :(
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
