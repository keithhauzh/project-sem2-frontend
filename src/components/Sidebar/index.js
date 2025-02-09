import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { isUserLoggedin, isAdmin, getCurrentUser } from "../../utils/api_auth";

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
import AssistantIcon from "@mui/icons-material/Assistant";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Filter9PlusIcon from "@mui/icons-material/Filter9Plus";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const [cookie, removeCookie] = useCookies(["currentUser"]);
  const currentUser = getCurrentUser(cookie);

  const { toggleDrawer } = props;

  const handleLogout = () => {
    removeCookie("currentUser");
    toast.warning("Logged out.");
    // console.log(cookie);
    navigate("/login");
  };

  const handleSwitchAccount = () => {
    removeCookie("currentUser");
    toast.warning("Logged out.");
    // console.log(cookie);
    navigate("/switch-account");
  };

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
              navigate("/image-board");
            }}
          >
            <ListItemIcon>
              <Filter9PlusIcon />
            </ListItemIcon>
            <ListItemText primary="Image Board" />
          </ListItemButton>
        </ListItem>

        {isUserLoggedin(cookie) ? (
          <>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  navigate("/self-profile");
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
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
          </>
        ) : null}
      </List>
      <Divider />

      <List>
        {isUserLoggedin(cookie) ? (
          <>
            <ListItem>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={handleSwitchAccount}>
                <ListItemIcon>
                  <Man2Icon />
                </ListItemIcon>
                <ListItemText primary="Switch Account" />
                <ListItemIcon>
                  <Woman2Icon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            {!currentUser.premium_id ? (
              <>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate("/subscription");
                    }}
                  >
                    <ListItemIcon>
                      <AssistantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subscribe to BuzzBoard :)" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : null}
          </>
        ) : (
          <>
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
          </>
        )}
      </List>
      <Divider />
      <List>
        {isAdmin(cookie) ? (
          <>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  navigate("/admin");
                }}
              >
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
      </List>
    </Box>
  );
}
