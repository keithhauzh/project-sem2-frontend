import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { getInterests } from "../../utils/api_interests";
import { createInterest, deleteInterest } from "../../utils/api_admin";
import { getUserToken } from "../../utils/api_auth";

export default function AdminPanelInterests() {
  const [interestName, setInterestName] = useState("");
  const [interests, setInterests] = useState("");
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const handleInterestAdd = () => {
    if (interestName === "") {
      toast.error("Please provide a name for the interest you want to add...");
    } else {
      createInterest(interestName, token).then((data) => {
        if (!data) {
          toast.error("Please try again. ");
        } else {
          // console.log(data);
          getInterests().then((data) => {
            setInterests(data);
          });
          toast.success("Interest successfully created!");
        }
      });
    }
  };

  const handleDeleteInterest = (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"`
    );
    if (confirmed) {
      deleteInterest(id, token).then((data) => {
        if (!data) {
          toast.error("Please try again");
        } else {
          getInterests().then((data) => {
            setInterests(data);
          });
          toast.success(`Interest "${name}" deleted successfully`);
        }
      });
    }
  };

  useEffect(() => {
    getInterests().then((data) => {
      setInterests(data);
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Paper
          sx={{
            padding: "10px",
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <TextField
            label="Add a new Interest!"
            value={interestName}
            onChange={(event) => {
              setInterestName(event.target.value);
            }}
          />
          <Button
            onClick={handleInterestAdd}
            sx={{ display: "flex", justifyContent: "start" }}
          >
            Add Interest
          </Button>
        </Paper>
        {interests && interests.length > 0
          ? interests.map((interest) => (
              <Paper
                key={interest._id}
                elevation={10}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <Typography> {interest.name}</Typography>
                <Button color="">
                  <DeleteIcon
                    onClick={() => {
                      handleDeleteInterest(interest._id, interest.name);
                    }}
                  />
                </Button>
              </Paper>
            ))
          : null}
      </Box>
    </>
  );
}
