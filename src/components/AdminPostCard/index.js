import { indigo } from "@mui/material/colors";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminPostCard({ post }) {
  const postUserColor = indigo[200];

  const { user, title, content, interest } = post;

  return (
    <Card
      elevation={10}
      sx={{
        marginBottom: "25px",
        display: "flex",
        padding: "25px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <CardContent>
            <Typography marginBottom="10px" variant="h5" component="div">
              {title}
            </Typography>
            <Typography>{content}</Typography>
          </CardContent>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box color={postUserColor} sx={{ display: "flex", margin: "5px" }}>
              <Typography sx={{ marginRight: "5px" }}>Posted by</Typography>
              <Link
                href="/profile"
                sx={{ marginRight: "5px" }}
                color={postUserColor}
              >
                {user.name}
              </Link>
              <Typography>who is interested in "{interest.name}"</Typography>
            </Box>
          </Box>
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
        <>
          <Button color="error" variant="contained">
            Delete Post
          </Button>
        </>
      </Box>
    </Card>
  );
}
