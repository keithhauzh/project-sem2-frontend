import Sidebar from "../../components/Sidebar";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

import { useState } from "react";

export default function SidebarButton() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Button
        onClick={toggleDrawer(true)}
        sx={{ fontWeight: "bold", display: "flex" }}
        size="large"
        color=""
      >
        <BoltIcon />
        BuzzBoard
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} />
      </Drawer>
    </Box>
  );
}
