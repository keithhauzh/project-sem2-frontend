// MUI imports
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { blue } from "@mui/material/colors";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { getInterests } from "../../utils/api_interests";
import { editPost, getPost } from "../../utils/api_posts";
import { getUserToken, getUserId } from "../../utils/api_auth";

export default function PostEdit() {
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);
  const currentUserId = getUserId(cookie);

  const navigate = useNavigate();

  const { id } = useParams();

  // states for input fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [interest, setInterest] = useState("");
  const [userId, setUserId] = useState("");

  // state for loader
  const [loading, setLoading] = useState(true);

  // state for interests
  const [interests, setInterests] = useState([]);

  const backgroundColor = blue[100];

  useEffect(() => {
    getInterests().then((data) => {
      setInterests(data);
    });
  }, [interest]);

  useEffect(() => {
    if (!currentUserId === userId) {
      toast.error("Authentication Failed");
      navigate("/home");
    }
  }, [currentUserId, userId]);

  useEffect(() => {
    getPost(id).then((postData) => {
      if (!postData) {
        navigate("/");
        toast.error("Post could not be found");
      } else {
        setLoading(false);
        setTitle(postData.title);
        setContent(postData.content);
        setInterest(postData.interest);
        setUserId(postData.user);
      }
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!title || !content || !interest) {
      toast.error("Please fill out all the required fields! >:(");
    } else {
      const updatedPost = await editPost(id, title, content, interest, token);
      if (updatedPost) {
        toast.success("Post has been edited successfully");
        navigate("/");
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: { backgroundColor },
        }}
      >
        <Container sx={{ paddingTop: "100px" }}>
          <Card sx={{ padding: "25px" }}>
            <CardContent>
              <Typography variant="h4" align="center" mb={4}>
                Edit Post
              </Typography>
              <Box mb={2}>
                <TextField
                  label="Title"
                  required
                  fullWidth
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Content"
                  fullWidth
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Select
                  label="Interest"
                  value={interest}
                  fullWidth
                  onChange={(event) => setInterest(event.target.value)}
                >
                  {interests.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFormSubmit}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Container>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
}
