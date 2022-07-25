import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
import useItems from "../hooks/useItems";
import {
  Skeleton,
  Button,
  SwipeableDrawer,
  Stack,
  DialogTitle,
  List,
  ListItemButton,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  DialogActions,
} from "../node_modules/@mui/material/index";
import { Gear } from "../types";
import { useState } from "react";
import { DisplayCard } from "./DisplayCard";
import { useRouter } from "../node_modules/next/router";
import { useCharacterEditContext } from "../context/CharacterEditContext";

export function ItemsModal({ gearName }) {
  const { gear, setGear } = useCharacterBuilderContext();

  const [item, setItem] = useState(null);

  const { data: items, isLoading } = useItems({
    category: gearName === "Rings" ? "Ring" : gearName,
  });

  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  const onItemSelect = (value) => {
    setGear((prev: Gear) => ({
      ...prev,
      [gearName.toLowerCase()]: value.name,
    }));
  };

  return (
    <>
      {item && <DisplayCard htmlToRender={item.html} />}
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        {gear[gearName === "Rings" ? "rings" : gearName.toLowerCase()] === ""
          ? "Add"
          : "Change"}{" "}
        {gearName}
      </Button>
      <Dialog open={open} onClose={toggleOpen} fullScreen>
        <Stack>
          <DialogTitle>{gearName}</DialogTitle>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="item">{gearName}</InputLabel>
            <Select
              id="item"
              onChange={(e) => setItem(e.target.value)}
              value={gear[gearName.toLowerCase()]}
            >
              {items.map((item) => (
                <MenuItem value={item} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {item && <DisplayCard htmlToRender={item.html} />}
        <DialogActions>
          <Button onClick={toggleOpen}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
