import AdminPostCard from "../../components/AdminPostCard";
import { getPosts } from "../../utils/api_posts";

import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";

export default function AdminPanelPosts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      // console.log(data);
      setPosts(data);
    });
  }, []);

  const refreshPage = () => {
    getPosts().then((data) => {
      // console.log(data);
      setPosts(data);
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: "25px", display: "flex", flexDirection: "column" }}>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <>
                <AdminPostCard post={post} refreshPage={refreshPage}/>
              </>
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
            No posts :(
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
      </Box>
    </Box>
  );
}
