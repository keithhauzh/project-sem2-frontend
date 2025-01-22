import { indigo, pink } from "@mui/material/colors";
import { Card, CardContent, Typography, Link, Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";

export default function PostCard() {
  const postUserColor = indigo[200];
  const commentColor = pink[400];

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const likeHandler = () => {
    setLiked(!liked);
  };

  const bookmarkHandler = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <Card elevation={10} sx={{ marginBottom: "25px", display: "flex" }}>
      <Box>
        <CardContent>
          <Typography marginBottom="10px" variant="h5" component="div">
            Card Title
          </Typography>
          <Typography>
            Content of Example Card: "Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum."
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color={postUserColor} sx={{ margin: "5px" }}>
            Posted by{" "}
            <Link href="/profile" color={postUserColor}>
              User
            </Link>
          </Typography>
          <Typography color={commentColor} sx={{ margin: "5px" }}>
            <Link href="/comments" color={commentColor}>
              View Comments
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginRight: "15px",
          rowGap: "15px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {!liked ? (
            <ThumbUpOffAltIcon onClick={likeHandler} />
          ) : (
            <ThumbUpIcon onClick={likeHandler} />
          )}
          <Typography sx={{ marginLeft: "8px" }}>0</Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          {!bookmarked ? (
            <BookmarkBorderIcon onClick={bookmarkHandler} />
          ) : (
            <BookmarkIcon onClick={bookmarkHandler} />
          )}
          <Typography sx={{ marginLeft: "8px" }}>0</Typography>
        </Box>
      </Box>
    </Card>
  );
}
