import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useState } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import axios from "axios";
import { getConfig } from "../interfaces/configInterface";

const drawerWidth = 240;



const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const baseURL = `${getConfig().baseURL}`;
  const token = sessionStorage.getItem("token");

  // För räknarna incheckade / på plats
  const [totalCheckedIn, setTotalCheckedIn] = useState();
  const [atLocation, setAtLocation] = useState();

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    setOpen(false);
    sessionStorage.setItem("token", "");

  };

  async function totalParticipantsAtScene() {
    await axios
    .get(`${baseURL}/api/v1/participants/countParticipantsInBuilding`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((response) => {
      setAtLocation(response.data);
      console.log("Antal på plats: " + response.data)
    })
    .catch((error) => {
      if (error.response) {
        console.log("Det gick inte utföra räkningen");
      } else {
        console.error(error);
      }
    });
  }

  async function totalParticipantsCheckedIn() {
   await axios
    .get(`${baseURL}/api/v1/participants/findNumberOfParticipants`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((response) => {
      setTotalCheckedIn(response.data);
      console.log("Antal incheckade: " + response.data)
    })
    .catch((error) => {
      if (error.response) {
        console.log("Det gick inte utföra räkningen");
      } else {
        console.error(error);
      }
    });
  }


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Subzero E-Games
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <Link to={"/"}>
              <ListItemButton>
                <ListItemIcon>
                  <QrCodeIcon />
                </ListItemIcon>
                <ListItemText
                  className="menu-item"
                  primary={"QR skanner"}
                  onClick={handleDrawerClose}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Link to={"/registeruser"}>
              <ListItemButton>
                <ListItemIcon>
                  <AccessibilityNewIcon />
                </ListItemIcon>
                <ListItemText
                  className="menu-item"
                  primary={"Registrera Moderator"}
                  onClick={handleDrawerClose}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Link to={"/searchuser"}>
              <ListItemButton>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText
                  className="menu-item"
                  primary={"Sök deltagare"}
                  onClick={handleDrawerClose}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Link to={"/searchmoderators"}>
              <ListItemButton>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText
                  className="menu-item"
                  primary={"Sök Moderator"}
                  onClick={handleDrawerClose}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Link to={"/moderators"}>
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText
                  className="menu-item"
                  primary={"Moderatorer"}
                  onClick={handleDrawerClose}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to={"/login"}>
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText
                  className="menu-item"
                  primary={"Logga ut"}
                  onClick={logOut}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
          <div className='participant-counter-container'>
            <div className="counter-container">
              <h6 className="heading-counter">På plats: {atLocation}</h6> < CachedIcon className="reload-counter-btn" onClick={totalParticipantsAtScene}/>
            </div>
            <div className="counter-container">
              <h6 className="heading-counter">Totalt incheckade: {totalCheckedIn}</h6> < CachedIcon className="reload-counter-btn" onClick={totalParticipantsCheckedIn}/>
            </div>
          </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
