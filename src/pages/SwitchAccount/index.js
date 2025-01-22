import { Box } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";

import SidebarButton from "../../components/SidebarButton";
import Header from "../../components/Header";
import { Container, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

// import { useState } from "react";

export default function SwitchAccount() {
  // states for input fields
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

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

      <Header title="Switch Account" />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
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
              <Grid item xs={12} sx={{ display: "flex", width: "100%" }}>
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
              <Grid item xs={12} sx={{ display: "flex", width: "100%" }}>
                <TextField
                  fullWidth
                  //   value={password}
                  //   onChange={(event) => {
                  //     setPassword(event.target.value);
                  //   }}
                  label="Password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: deepOrange[900],
                backgroundColor: deepOrange[200],
              }}
              //   onClick={handleFormSubmit}
            >
              Switch Account
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
