import { Button, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

import Header from "../../components/Header";
import SidebarButton from "../../components/SidebarButton";
import AdminPanelPosts from "../../components/AdminPanelPosts";
import AdminPanelUsers from "../../components/AdminPanelUsers";
import AdminPanelInterests from "../../components/AdminPanelInterests";
import AdminPanelSubscriptions from "../../components/AdminPanelSubscriptions";

import { useState } from "react";

export default function AdminPanel() {
  const [panel, setPanel] = useState("users");

  const backgroundColor = blue[100];

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
              <Button
                variant={panel === "subscriptions" ? "outlined" : "text"}
                color=""
                onClick={() => {
                  setPanel("subscriptions");
                }}
              >
                Subscriptions
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              {panel === "users" ? <AdminPanelUsers /> : null}
              {panel === "posts" ? <AdminPanelPosts /> : null}
              {panel === "interests" ? <AdminPanelInterests /> : null}
              {panel === "subscriptions" ? <AdminPanelSubscriptions /> : null}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
