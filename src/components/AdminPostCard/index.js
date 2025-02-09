import { indigo } from "@mui/material/colors";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Button,
} from "@mui/material";

import { toast } from "sonner";
import { useCookies } from "react-cookie";

import { deletePost } from "../../utils/api_admin";
import { getUserToken } from "../../utils/api_auth";

export default function AdminPostCard({ post, refreshPage }) {
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const postUserColor = indigo[200];
  const handleDeletePost = (id) => {
    const confirmed = window.confirm(`Are you sure want to delete this post?`);
    if (confirmed) {
      deletePost(id, token).then((data) => {
        if (!data) {
          toast.error("Please try again");
        } else {
          refreshPage();
          toast.success(`Post by has been deleted successfully`);
        }
      });
    }

    refreshPage();
  };
  const { _id, user, title, content, interest } = post;

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
              {user ? (
                <>
                  <Link
                    href="/profile"
                    sx={{ marginRight: "5px" }}
                    color={postUserColor}
                  >
                    {user.name}
                  </Link>
                </>
              ) : (
                <Typography>Deleted User</Typography>
              )}

              {interest && interest.name ? (
                <>
                  <Typography>
                    who is interested in "{interest.name}"
                  </Typography>
                </>
              ) : null}
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
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleDeletePost(_id);
            }}
          >
            Delete Post
          </Button>
        </>
      </Box>
    </Card>
  );
}
