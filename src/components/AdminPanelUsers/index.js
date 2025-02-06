import Grid from "@mui/material/Grid2";
import { Box, Typography, Button, Paper } from "@mui/material";
import { indigo } from "@mui/material/colors";

import { useEffect, useState } from "react";

import { banUsers, getUsers } from "../../utils/api_admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { getCurrentUser, getUserToken } from "../../utils/api_auth";

export default function AdminPanelUsers() {
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);
  const currentUser = getCurrentUser(cookie);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const banUser = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      // console.log(_id);
      const deleted = await banUsers(_id, token);
      // console.log(deleted);
      // console.log(_id);
      // console.log(token);
      if (deleted) {
        getUsers().then((data) => {
          setUsers(data);
        });
        toast.success("User has been banned successfully");
      } else {
        toast.error("Please try again.");
      }
    }
  };

  return (
    <>
      <Grid sx={{ width: "100%" }} container spacing={2}>
        {users.length > 0 ? (
          users.map((user) => {
            const { _id, name, email, role, premium_id } = user;
            return (
              <>
                {currentUser._id !== _id ? (
                  <>
                    <Grid
                      key={_id}
                      item
                      size={{ xs: 12, md: 6, lg: 4 }}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Paper elevation={20} sx={{ padding: "15px" }}>
                        <Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{ fontWeight: "bold", marginRight: "5px" }}
                            >
                              Id:
                            </Typography>
                            <Typography>{_id}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{ fontWeight: "bold", marginRight: "5px" }}
                            >
                              Name:
                            </Typography>
                            <Typography>{name}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{ fontWeight: "bold", marginRight: "5px" }}
                            >
                              Email:
                            </Typography>
                            <Typography>{email}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{ fontWeight: "bold", marginRight: "5px" }}
                            >
                              Role:
                            </Typography>
                            <Typography>{role}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{ fontWeight: "bold", marginRight: "5px" }}
                            >
                              Premium Id:
                            </Typography>
                            <Typography>
                              {premium_id
                                ? premium_id
                                : "Not a premium account"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            marginTop: "15px",
                            columnGap: "10px",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            size="large"
                            variant="contained"
                            color="error"
                            onClick={() => {
                              banUser(_id);
                            }}
                          >
                            Ban >:(
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </>
                ) : null}
              </>
            );
          })
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            No users :(
          </Box>
        )}
      </Grid>
    </>
  );
}
