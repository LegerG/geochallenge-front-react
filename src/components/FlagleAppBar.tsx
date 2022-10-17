import React, { useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
  Home as HomeIcon,
  Flag as FlagIcon,
  Info as InfoIcon,
  Send as SendIcon,
  Policy as PolicyIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GAME_URL, ROOT_URL } from "../utils/urls";
import { useTranslation } from "react-i18next";

export const FlagleAppBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items = [
    { text: "Home", path: ROOT_URL, icon: <HomeIcon /> },
    { text: t("app.newGame"), path: GAME_URL, icon: <FlagIcon /> },
    { text: "About", path: "#", icon: <InfoIcon /> },
    { text: "Contact", path: "#", icon: <SendIcon /> },
    { text: "GCU", path: "#", icon: <PolicyIcon /> },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{t("app.title")}</Typography>

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
              <ListItemText primary={t("app.close")} />
            </ListItemButton>

            <Divider />

            {items.map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
