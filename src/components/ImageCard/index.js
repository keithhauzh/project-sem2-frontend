import Grid from "@mui/material/Grid2";
import { Card, CardMedia, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { API_URL } from "../../constants";
import { checkImageLiked, likeImage } from "../../utils/api_images";
import {
  getCurrentUser,
  getUserToken,
  isUserLoggedin,
} from "../../utils/api_auth";

export default function ImageCard({ oneImage, refreshPage }) {
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);
  const currentUser = getCurrentUser(cookie);
  const isLoggedin = isUserLoggedin(cookie);
  const { _id, image, likes } = oneImage;
  const [liked, setLiked] = useState(false);
  const likeHandler = () => {
    likeImage(_id, token).then((data) => {
      setLiked(data);
      if (data) {
        toast.info("Liked");
        refreshPage();
      } else {
        toast.warning("Unliked");
        refreshPage();
      }
    });
  };
  useEffect(() => {
    if (currentUser && likes && likes.length > 0) {
      const likedOrNot = checkImageLiked(currentUser, likes);
      setLiked(likedOrNot);
    }
  }, [currentUser, likes]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={_id}>
      <Card
        variant="outlined"
        sx={{
          margin: "10px",
          paddingTop: "10px",
          paddingRight: "10px",
          paddingLeft: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover", // Prevents stretching
            borderRadius: "8px",
          }}
          component="img"
          image={`${API_URL}/${image}`}
          alt={`Uploaded image ${image}`}
        />
        {isLoggedin ? (
          <>
            <Button color="" onClick={likeHandler} sx={{ paddingTop: "5px" }}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              <Typography>
                {likes && likes.length > 0 ? likes.length : 0}
              </Typography>
            </Button>
          </>
        ) : null}
      </Card>
    </Grid>
  );
}
