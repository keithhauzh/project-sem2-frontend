import { indigo, pink, amber, red } from "@mui/material/colors";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { useNavigate, Link as RouterDom } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import {
  checkPostLiked,
  likePost,
  bookmarkPost,
  checkPostBookmarked,
  deletePost,
} from "../../utils/api_posts";
import {
  getCurrentUser,
  getUserId,
  getUserToken,
  isUserLoggedin,
} from "../../utils/api_auth";

export default function PostCard({ post, refreshAlong }) {
  const { _id, user, title, content, interest, likes, comments, bookmarks } =
    post;

  const navigate = useNavigate();

  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);
  const currentUser = getUserId(cookie);
  const loggedInUser = getCurrentUser(cookie);
  const loggedUser = isUserLoggedin(cookie);

  const postUserColor = indigo[200];
  const commentColor = pink[400];
  const pinkTitle = pink[400];
  const goldTitle = amber[500];
  const redTitle = red["A700"];

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    console.log(user);
    if (currentUser && likes && likes.length > 0) {
      const likedOrNot = checkPostLiked(currentUser, likes);
      setLiked(likedOrNot);
    }
    return () => {};
  }, [currentUser, likes]);

  useEffect(() => {
    if (currentUser && bookmarks && bookmarks.length > 0) {
      const bookmarkedOrNot = checkPostBookmarked(currentUser, bookmarks);
      setBookmarked(bookmarkedOrNot);
    }
    return () => {};
  }, [currentUser, bookmarks]);

  useEffect(() => {
    refreshAlong();
    // console.log(user._id);
    // console.log(currentUser);
    return () => {};
  }, [liked, bookmarked]);

  const likeHandler = () => {
    if (!loggedUser) {
      toast.error("Please login first! :)");
      navigate("/login");
    } else {
      likePost(_id, currentUser, token).then((data) => {
        // console.log(data);
        if (data) {
          toast.success("Liked :)");
        } else {
          toast.info("Removed Like :(");
        }
        setLiked(data);
        // console.log(data);
      });
    }
  };

  const bookmarkHandler = () => {
    if (!loggedUser) {
      toast.error("Please login first! :)");
      navigate("/login");
    } else {
      bookmarkPost(_id, currentUser, token).then((data) => {
        // console.log(data);
        if (data) {
          toast.success("Bookmarked :)");
        } else {
          toast.info("Removed Bookmark :(");
        }
        setBookmarked(data);
        // console.log(data);
      });
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      const deleted = await deletePost(_id, token);
      if (deleted) {
        refreshAlong();
        toast.warning("Post deleted successfully");
      } else {
        toast.error("Failed to delete post");
      }
    }
  };

  return (
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
          <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
        </CardContent>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color={postUserColor} sx={{ marginRight: "5px" }}>
              Posted by
            </Typography>
            {user ? (
              <>
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
              </>
            ) : (
              <Typography
                color={postUserColor}
                sx={{ marginLeft: "2px", marginRight: "5px" }}
              >
                Deleted User
              </Typography>
            )}

            {interest && interest.name ? (
              <>
                {user ? (
                  <>
                    <Typography color={postUserColor}>
                      who is interested in "{interest.name}"
                    </Typography>
                  </>
                ) : (
                  <Typography color={postUserColor}>
                    who was interested in "{interest.name}"
                  </Typography>
                )}
              </>
            ) : null}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "100px", // Prevents shrinking
          paddingLeft: "10px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {!liked ? (
            <ThumbUpOffAltIcon onClick={likeHandler} />
          ) : (
            <ThumbUpIcon onClick={likeHandler} />
          )}
          <Typography sx={{ marginLeft: "8px" }}>
            {likes?.length || 0}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          {!bookmarked ? (
            <BookmarkBorderIcon onClick={bookmarkHandler} />
          ) : (
            <BookmarkIcon onClick={bookmarkHandler} />
          )}
          <Typography sx={{ marginLeft: "8px" }}>
            {bookmarks?.length || 0}
          </Typography>
        </Box>

        <Typography color={commentColor} sx={{ padding: "15px" }}>
          <Link
            component={RouterDom}
            to={`/comments/` + _id}
            color={commentColor}
          >
            View {comments.length > 0 ? comments.length : 0} comments
          </Link>
        </Typography>

        {/* Buttons - Ensures visibility */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {user ? (
            <>
              {user._id === currentUser && (
                <Button onClick={handleDelete} color="error">
                  <DeleteIcon />
                </Button>
              )}
              {loggedInUser &&
              loggedInUser.premium_id &&
              user._id === currentUser ? (
                <Button component={RouterDom} to={`/edit/` + _id}>
                  <CreateIcon />
                </Button>
              ) : null}
            </>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}
