// mui imports
import { Button, TextField, Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { blue, indigo, lightBlue } from "@mui/material/colors";

import Header from "../../components/Header";
import SidebarButton from "../../components/SidebarButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "sonner";
import { doSignup } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

export default function SignupPage() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["currentUser"]);
  const backgroundColor = blue[100];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill out all the required fields >:(");
    } else if (password !== confirmPassword) {
      toast.error(
        "Please make sure both password fields are filled in the same :("
      );
    } else {
      const userData = await doSignup(name, email, password);
      if (userData) {
        toast.success(
          "You have successfully made a new account. We have also logged you in automatically. Have fun!"
        );
        setCookie("currentUser", userData, { maxAge: 60 * 60 * 24 * 30 });
        // console.log(cookie);
        navigate("/");
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
      <Header title="Signup" />
      <Container component="main" minWidth="xs" sx={{ paddingTop: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // for border
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 4,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid
                item
                size={{ xs: 12, md: 6 }}
                sm={6}
                sx={{ display: "flex", width: "100%" }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", width: "100%" }}
              >
                <TextField
                  required
                  fullWidth
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  label="Email Address"
                />
              </Grid>
              <Grid
                item
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", width: "100%" }}
              >
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid
                item
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", width: "100%" }}
              >
                <TextField
                  required
                  fullWidth
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: indigo[300],
                color: lightBlue[100],
              }}
              onClick={handleFormSubmit}
            >
              Signup
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "10px",
              marginBottom: "20px",
            }}
          >
            <ArrowDownwardIcon />
            <>Or Login here</>
            <ArrowDownwardIcon />
          </Box>
          <Link to="/login" variant="body2">
            Click Me!
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
