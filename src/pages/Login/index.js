import { Box } from "@mui/material";
import { blue, teal } from "@mui/material/colors";

import SidebarButton from "../../components/SidebarButton";
import Header from "../../components/Header";
import { Container, TextField, Button, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { doLogin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["currentUser"]);

  // states for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all the required fields >:(");
    } else {
      const userData = await doLogin(email, password);
      if (userData) {
        toast.success("You have successfully logged in. Have fun!");
        setCookie("currentUser", userData, { maxAge: 60 * 60 * 24 * 30 });
        // console.log(cookie);
        navigate("/");
      }
    }
  };

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

      <Header title="Login" />

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
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", width: "100%" }}>
                <TextField
                  fullWidth
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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
                color: teal[900],
                backgroundColor: teal[100],
              }}
              onClick={handleFormSubmit}
            >
              Login
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
            <>Or Signup here</>
            <ArrowDownwardIcon />
          </Box>
          <Link href="/signup" variant="body2">
            Click Me!
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
