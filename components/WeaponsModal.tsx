import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
import useWeapons from "../hooks/useWeapons";
import {
  Skeleton,
  Button,
  Stack,
  DialogTitle,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  DialogActions,
  NativeSelect,
} from "../node_modules/@mui/material/index";
import { Gear } from "../types";
import { find } from "lodash";
import { DisplayCard } from "./DisplayCard";
import { useCharacterEditContext } from "../context/CharacterEditContext";
import { useRouter } from "../node_modules/next/router";

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
            <InputLabel htmlFor="weapon">Base Weapon</InputLabel>
            <NativeSelect
              onChange={(e) => {
                setBaseWeapon(find(weapons, { name: e.target.value }));
              }}
            >
              {weapons
                .filter(({ rarity }) => rarity === "Mundane")
                .map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
            </NativeSelect>
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
