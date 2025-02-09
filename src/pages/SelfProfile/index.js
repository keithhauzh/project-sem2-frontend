import { blue } from "@mui/material/colors";
import {
  Box,
  Container,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { pink, amber, red } from "@mui/material/colors";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import SidebarButton from "../../components/SidebarButton";
import Header from "../../components/Header";

import { getSelfProfile, editProfile } from "../../utils/api_profile";
import { getCurrentUser, getUserToken } from "../../utils/api_auth";

export default function SelfProfilePage() {
  const backgroundColor = blue[100];
  const navigate = useNavigate();

  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);
  const currentUser = getCurrentUser(cookie);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("none");

  const pinkTitle = pink[400];
  const goldTitle = amber[500];
  const redTitle = red["A700"];

  useEffect(() => {
    getSelfProfile(token).then((data) => {
      // console.log(currentUser.premium_id);
      if (data) {
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio ? data.bio : null);
        setTitle(data.specialTitle || "NO TITLE");
        setColor(data.premium_color || "none");
      } else {
        toast.error("User data could not be found.");
      }
    });
  }, [token]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !color) {
      toast.error("Please fill out all the required fields! >:(");
    } else {
      const updatedTitle = title === "NO TITLE" ? "" : title;
      const updatedProfile = await editProfile(
        name,
        bio,
        updatedTitle,
        color,
        token
      );
      if (updatedProfile) {
        toast.success("Profile has been edited successfully");
        navigate("/");
      } else {
        toast.error("Please try again.");
      }
    }
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
      <Header title="Edit Profile" />
      <Container
        sx={{
          display: "flex",
          padding: "25px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          elevation={10}
          sx={{
            display: "flex",
            padding: "25px",
            width: "80%",
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "15px",
          }}
        >
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            label="Bio"
            fullWidth
            value={bio}
            onChange={(event) => {
              setBio(event.target.value);
            }}
          />
          <TextField fullWidth value={email} disabled />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              disabled={currentUser.premium_id ? false : true}
              sx={{
                "& .MuiInputBase-input": {
                  color:
                    color === "pink"
                      ? pinkTitle
                      : color === "gold"
                      ? goldTitle
                      : color === "red"
                      ? redTitle
                      : "",
                },
              }}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Color</InputLabel>
              <Select
                disabled={currentUser.premium_id ? false : true}
                value={color}
                label="Color"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="pink">Pink</MenuItem>
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="red">Red</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleFormSubmit}>Edit</Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
