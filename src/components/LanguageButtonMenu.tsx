import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export function LanguageButtonMenu() {
  const [buttonAnchor, setButtonAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(buttonAnchor);
  const { t, i18n, ready } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonAnchor(event.currentTarget);
  };

  const close = () => {
    setButtonAnchor(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    close();
  };

  return (
    <div>
      <Button
        id="language-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#fff" }}
        startIcon={<LanguageIcon />}
      >
        {t("app.language")}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={buttonAnchor}
        open={open}
        onClose={close}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        {ready &&
          ["en", "es", "fr"].map((language) => (
            <MenuItem
              key={language}
              disabled={i18n.language === language}
              onClick={() => handleLanguageChange(language)}
            >
              {t(`app.languageMenu.${language}`)}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
