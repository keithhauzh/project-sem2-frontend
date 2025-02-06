import {
  Box,
  Card,
  Typography,
  TextField,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { getInterests } from "../../utils/api_interests";
import { getUserId, getUserToken } from "../../utils/api_auth";
import { addPost } from "../../utils/api_posts";

export default function AddPostCard(props) {
  const { refreshAlong } = props;

  const [cookie] = useCookies(["currentUser"]);
  const user = getUserId(cookie);
  const token = getUserToken(cookie);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [interests, setInterests] = useState([]);
  const [interest, setInterest] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content || !interest) {
      toast.error("Please fill out all the required fields");
    } else {
      const newPostData = await addPost(user, title, content, interest, token);
      if (newPostData) {
        toast.success("Post successful");
        setTitle("");
        setContent("");
        setInterest("");
        refreshAlong();
      } else {
        toast.error("Post Failed");
        // console.log(newPostData);
      }
    }
  };

  useEffect(() => {
    getInterests().then((data) => {
      // console.log(data);
      setInterests(data);
    });
  }, []);

  return (
    <Container sx={{ marginTop: "25px" }}>
      <Card elevation={10} sx={{ padding: "50px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Post Something?
          <SentimentSatisfiedAltIcon
            sx={{ marginLeft: "10px" }}
            fontSize="large"
          />
        </Typography>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
          }}
        >
          <Box
            sx={{
              marginTop: "20px",
              rowGap: "10px",
              display: "flex",
              flexDirection: "column",
              minWidth: "500px",
            }}
          >
            <input hidden value={1}></input>
            <TextField
              id="outlined-basic"
              label="Title of your post :)"
              variant="outlined"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Content :O"
              variant="outlined"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {!interests || interests.length === 0
                  ? "No interest categories have been created yet :("
                  : "What are you interested in?"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={interest}
                disabled={interests.length === 0}
                label={
                  !interests || interests.length === 0
                    ? "No interest categories have been created yet :("
                    : "What are you interested in?"
                }
                onChange={(event) => {
                  setInterest(event.target.value);
                }}
              >
                {interests.length > 0
                  ? interests.map((item) => {
                      return (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ marginRight: "10px" }}
                onClick={handleFormSubmit}
              >
                Post
              </Typography>
              <ArrowForwardIosIcon />
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
