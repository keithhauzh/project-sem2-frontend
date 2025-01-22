import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HomeIcon from "@mui/icons-material/Home";
import Man2Icon from "@mui/icons-material/Man2";
import Woman2Icon from "@mui/icons-material/Woman2";
import { useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const { toggleDrawer } = props;
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/bookmarks");
            }}
          >
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/signup");
            }}
          >
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/switch-account");
            }}
          >
            <ListItemIcon>
              <Man2Icon />
            </ListItemIcon>
            <ListItemText primary="Switch Account" />
            <ListItemIcon>
              <Woman2Icon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
