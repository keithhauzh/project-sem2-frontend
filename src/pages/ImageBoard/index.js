import SidebarButton from "../../components/SidebarButton";
import Header from "../../components/Header";
import ButtonUpload from "../../components/ButtonUpload";

import { blue } from "@mui/material/colors";
import { Box, Container, Button, Card, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid2";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { API_URL } from "../../constants";
import { getImages, uploadImage, uploadImageDoc } from "../../utils/api_images";
import { toast } from "sonner";
import { getUserToken } from "../../utils/api_auth";
import ImageCard from "../../components/ImageCard";

export default function ImageBoardPage() {
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const backgroundColor = blue[100];
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    const response = await uploadImage(files[0]);

    if (!response || !response.image_url) {
      toast.error("Image upload failed. Please try again.");
      return;
    }

    setImage(response.image_url);
  };

  const handleFormSubmit = async (event) => {
    console.log("triggered");
    event.preventDefault();
    if (!image) {
      toast.error("Please choose an image to upload.");
    } else {
      const newImageData = await uploadImageDoc(image, token);
      if (newImageData) {
        toast.success("Post successful");
        refreshPage();
        setImage("");
      } else {
        toast.error("Please try again.");
      }
    }
  };

  useEffect(() => {
    getImages(page).then((data) => {
      setImages(data);
    });
  }, [page]);

  const refreshPage = () => {
    getImages(page).then((data) => {
      setImages(data);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: { backgroundColor },
      }}
    >
      <SidebarButton />
      <Header title="Image Board!" />
      <Container>
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
            Post An Image?
            <SentimentVerySatisfiedIcon
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
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <ButtonUpload
                  onFileUpload={(files) => {
                    if (files && files[0]) {
                      // console.log(files);
                      handleImageUpload(files);
                    }
                  }}
                />
              </Box>

              {image ? (
                <img
                  alt="Uploaded preview"
                  src={`${API_URL}/${image}`} // Ensure correct path
                  style={{
                    marginTop: "25px",
                    width: "100%",
                    maxWidth: "300px",
                  }}
                />
              ) : null}
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                color="warning"
                onClick={() => {
                  setImage("");
                }}
              >
                Remove
              </Button>
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

        {/* Card */}
        <Grid container spacing={2} sx={{ width: "100%", marginTop: "50px" }}>
          {images && images.length > 0 ? (
            images.map((item) => <ImageCard oneImage={item} refreshPage={refreshPage}/>)
          ) : (
            <Grid item xs={12}>
              <Typography>No Images Found</Typography>
            </Grid>
          )}
        </Grid>

        {/* pagination section */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            marginTop: "50px",
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
      </Container>
    </Box>
  );
}
