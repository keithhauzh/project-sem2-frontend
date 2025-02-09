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
} from "@mui/material";
import { pink, amber, red } from "@mui/material/colors";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import SidebarButton from "../../components/SidebarButton";
import Header from "../../components/Header";

import { getProfile } from "../../utils/api_profile";

export default function ProfilePage() {
  const { id } = useParams();

  const backgroundColor = blue[100];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("none");

  const pinkTitle = pink[400];
  const goldTitle = amber[500];
  const redTitle = red["A700"];

  useEffect(() => {
    // console.log(bio);
    getProfile(id).then((data) => {
      console.log(data);
      if (data && data.title) {
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio ? data.bio : null);
        setTitle(data.title);
        setColor(data.color);
      } else if (data) {
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio ? data.bio : null);
        setTitle("NO TITLE");
        setColor(data.color);
      } else {
        toast.error("Failed to get user data, please reload.");
      }
    });
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: { backgroundColor },
      }}
    >
      <SidebarButton />
      <Header title={name + "'s Profile"} />
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
            disabled
            label="Name"
            fullWidth
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            disabled
            label="Bio"
            fullWidth
            value={bio ? bio : "No information given"}
            onChange={(event) => {
              setBio(event.target.value);
            }}
          />
          <TextField
            disabled
            fullWidth
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
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
                      : "",
                  backgroundColor:
                    color === "pink"
                      ? pinkTitle
                      : color === "gold"
                      ? goldTitle
                      : color === "red"
                      ? redTitle
                      : "",
                },
              }}
              disabled
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Color</InputLabel>
              <Select
                disabled
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
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
