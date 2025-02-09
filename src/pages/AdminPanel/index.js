import { Button, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

import Header from "../../components/Header";
import SidebarButton from "../../components/SidebarButton";
import AdminPanelPosts from "../../components/AdminPanelPosts";
import AdminPanelUsers from "../../components/AdminPanelUsers";
import AdminPanelInterests from "../../components/AdminPanelInterests";

import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import { getCurrentUser } from "../../utils/api_auth";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["currentUser"]);
  const currentUser = getCurrentUser(cookie);

  const [panel, setPanel] = useState("users");
  const backgroundColor = blue[100];

  useEffect(() => {
    if (currentUser.role !== "admin") {
      toast.error("You are not an admin!");
      navigate("/");
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: { backgroundColor },
        }}
      >
        <SidebarButton />
        <Header title="Admin Panel" />
        <Container>
          <Paper sx={{ margin: "50px", padding: "25px" }} elevated={20}>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              variant="h4"
            >
              A dedicated admin panel for doing admin things :)
            </Typography>
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant={panel === "users" ? "outlined" : "text"}
                color=""
                onClick={() => {
                  setPanel("users");
                }}
              >
                Users
              </Button>
              <Button
                variant={panel === "posts" ? "outlined" : "text"}
                color=""
                onClick={() => {
                  setPanel("posts");
                }}
              >
                Posts
              </Button>
              <Button
                variant={panel === "interests" ? "outlined" : "text"}
                color=""
                onClick={() => {
                  setPanel("interests");
                }}
              >
                Interests
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              {panel === "users" ? <AdminPanelUsers /> : null}
              {panel === "posts" ? <AdminPanelPosts /> : null}
              {panel === "interests" ? <AdminPanelInterests /> : null}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
