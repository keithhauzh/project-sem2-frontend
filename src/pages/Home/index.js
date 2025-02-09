import SidebarButton from "../../components/SidebarButton";
import AddPostCard from "../../components/AddPostCard";
import PostCard from "../../components/PostCard";
import Header from "../../components/Header";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import {
  Box,
  Container,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { getPosts } from "../../utils/api_posts";
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
    // console.log(filterInterest);
    getPosts(filterInterest, page).then((data) => {
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
      // setInterest("");
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
          <FormControl fullWidth>
            <InputLabel>Choose an Interest to filter posts by</InputLabel>
            <Select
              labelId="interest-label"
              value={filterInterest}
              onChange={(event) => setFilterInterest(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {interests.map((interest) => (
                <MenuItem key={interest._id} value={interest._id}>
                  {interest.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
