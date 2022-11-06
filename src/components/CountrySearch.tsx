import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { TerritoryName } from "../models/country";

interface CountrySearchProps {
  names: TerritoryName[];
  onChange: (event: React.ChangeEvent<{}>, value: TerritoryName | null) => void;
}

export function CountrySearch(props: CountrySearchProps) {
  const { names, onChange } = props;
  const { t } = useTranslation();

  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      options={names}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("game.countrySearch")}
          variant="outlined"
          autoFocus
          InputProps={{
            ...params.InputProps,
            type: "search",
            onInput(event: React.ChangeEvent<HTMLInputElement>) {
              if (event) {
                setInputValue(event.target.value);
              }
            },
          }}
        />
      )}
      autoComplete
      inputValue={inputValue}
      onChange={(event, newValue) => {
        onChange(event, newValue);
        setInputValue("");
      }}
      ListboxProps={{
        style: {
          maxHeight: "20vh",
        },
      }}
      sx={{ mt: 2 }}
      fullWidth
      autoHighlight
      clearIcon={null}
      clearOnEscape
    />
  );
}
