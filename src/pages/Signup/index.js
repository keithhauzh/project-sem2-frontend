// mui imports
import { Button, TextField, Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { blue, indigo, lightBlue } from "@mui/material/colors";

import Header from "../../components/Header";
import SidebarButton from "../../components/SidebarButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { Link /*useNavigate*/ } from "react-router-dom";

//   // react imports
//   import React, { useState } from "react";

//   // sonner imports
//   import { toast } from "sonner";

//   // api imports
//   import { doSignup } from "../../utils/api_auth";

//   // component improts
//   import Header from "../../components/Header";

//   // import useCookies
//   import { useCookies } from "react-cookie";

export default function SignupPage() {
  // const navigate = useNavigate();
  const backgroundColor = blue[100];
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
                  //   value={name}
                  //   onChange={(event) => {
                  //     setName(event.target.value);
                  //   }}
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
                  //   value={email}
                  //   onChange={(event) => {
                  //     setEmail(event.target.value);
                  //   }}
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
                  //   value={password}
                  //   onChange={(event) => {
                  //     setPassword(event.target.value);
                  //   }}
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
                  //   value={confirmPassword}
                  //   onChange={(event) => {
                  //     setConfirmPassword(event.target.value);
                  //   }}
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

              //   onClick={handleFormSubmit}
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
