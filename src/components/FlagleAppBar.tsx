import React, { useState, useRef } from "react";
import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Popper,
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
import { ABOUT_URL, GAME_URL, ROOT_URL } from "../utils/urls";
import { useTranslation } from "react-i18next";
import { LanguageButtonMenu } from "./LanguageButtonMenu";

export const FlagleAppBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items = [
    { text: t("app.home"), path: ROOT_URL, icon: <HomeIcon /> },
    { text: t("app.newGame"), path: GAME_URL, icon: <FlagIcon /> },
    { text: t("app.about"), path: ABOUT_URL, icon: <InfoIcon /> },
    { text: t("app.contact"), path: "#", icon: <SendIcon />, disabled: true },
    { text: t("app.tou"), path: "#", icon: <PolicyIcon />, disabled: true },
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

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{t("app.title")}</Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <LanguageButtonMenu />
        </Box>
      </Toolbar>

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
                disabled={item.disabled}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
};
