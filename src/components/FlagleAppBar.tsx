import React, { useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
} from "@mui/icons-material";

export const FlagleAppBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar variant="outlined" position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">The title</Typography>

        <Drawer
          variant="temporary"
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <KeyboardDoubleArrowLeftIcon />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItemButton>

            <Divider />

            <ListItem>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem>
              <ListItemText primary="Contact" />
            </ListItem>

            <ListItem>
              <ListItemText primary="ServicesLOOOOOOOOOOOOOONG" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
