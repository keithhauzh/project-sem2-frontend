import SidebarButton from "../../components/SidebarButton";
import Header from "../../components/Header";
import {
  isUserLoggedin,
  getCurrentUser,
  getUserToken,
} from "../../utils/api_auth";

import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { blue, deepPurple, pink, amber, red } from "@mui/material/colors";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createSubscription } from "../../utils/api_subscriptions";

export default function SubscriptionPage() {
  const [cookie] = useCookies(["currentUser"]);
  const loggedUser = isUserLoggedin(cookie);
  const currentUser = getCurrentUser(cookie);
  const token = getUserToken(cookie);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("none");
  const pinkTitle = pink[400];
  const goldTitle = amber[500];
  const redTitle = red["A700"];

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      toast.error("Please login first! >:(");
      navigate("/login");
    }
    // console.log(currentUser);
  }, []);

  const backgroundColor = blue[100];
  const subscribeButton = deepPurple["A100"];

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const subscribeHandler = async () => {
    const { name, email } = currentUser;
    createSubscription(name, email, title, color, token).then((data) => {
      setLoading(true);

      if (!data) {
        setTitle("");
        setColor("none");
        setLoading(false);
        toast.error("Payment Failed. Please try again.");
      }

      if (data) {
        window.open(data.billplz_url, "_self");
        setLoading(false);
      }
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
      <Header title="Subscription" />

      <Container>
        <Typography sx={{ fontWeight: "bold", margin: "50px" }}>
          Unlock a Lifetime of Fun – No Strings Attached! 🎉 Join us with a
          one-time payment and gain lifetime access to all the excitement! As a
          valued member, you'll enjoy:
          <br />
          ✨ A special, exclusive member title to show off your status.
          <br />✨ The power to edit posts and shape the community like never
          before.
          <br />
          This is your chance to be part of something amazing – no recurring
          fees, just endless fun! Sign up today and make it yours forever.
        </Typography>
        <Card sx={{ padding: "50px" }}>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <KeyboardDoubleArrowDownIcon sx={{ paddingRight: "10px" }} />
            Signup Here!
            <KeyboardDoubleArrowDownIcon sx={{ paddingLeft: "10px" }} />
          </Typography>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                rowGap: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography>User: {currentUser.name}</Typography>
              <Typography>Email: {currentUser.email}</Typography>
              <Typography>Paid Amount: RM20</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "15px",
              }}
            >
              <Typography>
                Make your Special Title Here :) ! Or you can leave it blank to
                stay the same...
              </Typography>
              <Box>
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      color:
                        color === "pink"
                          ? pinkTitle
                          : color === "gold"
                          ? goldTitle
                          : color === "red"
                          ? redTitle
                          : "inherit",
                    },
                  }}
                  label="Your Special Title"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  value={title}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Color</InputLabel>
                  <Select
                    value={color}
                    label="Color"
                    onChange={handleColorChange}
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="pink">Pink</MenuItem>
                    <MenuItem value="gold">Gold</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                size="large"
                color="black"
                sx={{ fontWeight: "bold", backgroundColor: subscribeButton }}
                onClick={subscribeHandler}
              >
                Subscribe
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
