import { Box, Card, Typography, TextField, Container } from "@mui/material";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AddPostCard() {
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
            <TextField
              id="outlined-basic"
              label="Title of your post :)"
              variant="outlined"
              // value={}
            />
            <TextField
              id="outlined-basic"
              label="Content :O"
              variant="outlined"
              // value={}
            />
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
              <Typography sx={{ marginRight: "10px" }}>Post</Typography>
              <ArrowForwardIosIcon />
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
