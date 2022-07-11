import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
import useWeapons from "../hooks/useWeapons";
import {
  Skeleton,
  Button,
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
import { find, range } from "lodash";
import { DisplayCard } from "./DisplayCard";

export function WeaponsModal() {
  const { gear, setGear } = useCharacterBuilderContext();
  const { data: weapons, isLoading } = useWeapons();
  const { open, toggleOpen } = useToggle();
  const [baseWeapon, setBaseWeapon] = useState(null);

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  const onWeaponSelect = (value) => {
    setGear((prev: Gear) => ({
      ...prev,
      weapons: [...prev.weapons, value.name],
    }));
  };

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add Weapons
      </Button>
      <Dialog open={open} onClose={toggleOpen} fullScreen>
        <Stack>
          <DialogTitle>Weapons</DialogTitle>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="weapon">Base Weapon</InputLabel>
            <Select
              id="weapon"
              onChange={(e) => {
                setBaseWeapon(find(weapons, { name: e.target.value }));
              }}
            >
              {weapons
                .filter(({ rarity }) => rarity === "Mundane")
                .map((item) => (
                  <MenuItem value={item.name} key={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {baseWeapon && <DisplayCard htmlToRender={baseWeapon.html} />}
          <DialogActions>
            <Button onClick={toggleOpen}>Close</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
}
