import { blue, pink, amber, red, indigo } from "@mui/material/colors";
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
  Link,
  Paper,
} from "@mui/material";

import { useParams, useNavigate, Link as RouterDom } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

import { getPost } from "../../utils/api_posts";
import { getUserToken } from "../../utils/api_auth";
import { createComment } from "../../utils/api_comments";
import SidebarButton from "../../components/SidebarButton";

export default function CommentsPage() {
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const backgroundColor = blue[100];
  const pinkTitle = pink[400];
  const goldTitle = amber[500];
  const redTitle = red["A700"];
  const postUserColor = indigo[200];

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [interest, setInterest] = useState("");

  const [commentContent, setCommentContent] = useState("");
  const [allComments, setAllComments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(token);
    getPost(id).then((postData) => {
      if (!postData) {
        // navigate("/");
        toast.error("Post could not be found :(");
      } else {
        setUser(postData.user);
        setTitle(postData.title);
        setContent(postData.content);
        setInterest(postData.interest);
        setAllComments(postData.comments);
        // console.log(allComments);
        // console.log(postData);
        setLoading(false);
      }
    });
  }, [id]);

  const commentPostHandler = () => {
    createComment(id, commentContent, token).then((data) => {
      if (!data) {
        setCommentContent("");
        toast.error("Please try again.");
      } else {
        getPost(id).then((postData) => {
          if (!postData) {
            navigate("/");
            toast.error("Post could not be found :(");
          } else {
            // console.log(postData);
            setUser(postData.user);
            setTitle(postData.title);
            setContent(postData.content);
            setInterest(postData.interest);
            setAllComments(postData.comments);
            setCommentContent("");
            // console.log(postData);
            setLoading(false);
          }
        });
      }
    });
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
        <SidebarButton />
        <Typography variant="h4" sx={{ padding: "25px", fontWeight: "bold" }}>
          Comments on {user ? user.name : "Deleted User"}'s post
        </Typography>
        <Container sx={{ paddingTop: "100px" }}>
          <Card
            elevation={10}
            sx={{
              marginBottom: "25px",
              display: "flex",
              flexDirection: "row",
              padding: "25px",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box sx={{ flex: "1 1 auto", minWidth: "0" }}>
              <CardContent>
                <Typography marginBottom="10px" variant="h5" component="div">
                  {title}
                </Typography>
                <Typography sx={{ wordBreak: "break-word" }}>
                  {content}
                </Typography>
              </CardContent>

              <Box
                sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
              >
                <Box sx={{ display: "flex", margin: "5px" }}>
                  <Typography color={postUserColor} sx={{ marginRight: "5px" }}>
                    Posted by
                  </Typography>
                  {user ? (
                    <Link
                      href="/profile"
                      sx={{
                        marginRight: "5px",
                        color:
                          user && user.premium_color === "pink"
                            ? pinkTitle
                            : user && user.premium_color === "gold"
                            ? goldTitle
                            : user && user.premium_color === "red"
                            ? redTitle
                            : "inherit",
                        fontWeight: "bold",
                      }}
                      component={RouterDom}
                      to={`/profile/` + user._id}
                    >
                      {user.name} {user.specialTitle ? user.specialTitle : null}
                    </Link>
                  ) : (
                    <Typography color={postUserColor}>Deleted User</Typography>
                  )}
                  {interest ? (
                    <Typography color={postUserColor}>
                      who is interested in "{interest.name}"
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Card>
          <Paper
            sx={{
              padding: "10px",
              margin: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <TextField
              label="Content"
              value={commentContent}
              onChange={(event) => {
                setCommentContent(event.target.value);
              }}
            />
            <Button
              onClick={commentPostHandler}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              Post
            </Button>
          </Paper>
          {allComments && allComments.length > 0
            ? allComments.map((comment) => (
                <Paper
                  key={comment._id}
                  elevation={10}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <Typography> {comment.content}</Typography>
                </Paper>
              ))
            : null}
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
