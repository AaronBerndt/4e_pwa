import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
import useWeapons from "../hooks/useWeapons";
import {
  Skeleton,
  Button,
  SwipeableDrawer,
  Stack,
  DialogTitle,
  List,
  ListItemButton,
} from "../node_modules/@mui/material/index";
import { Gear } from "../types";

export function WeaponsModal() {
  const { gear, setGear } = useCharacterBuilderContext();
  const { data: weapons, isLoading } = useWeapons();
  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  const onWeaponSelect = (value: string) => {
    setGear((prev: Gear) => ({
      ...prev,
      ["weapons"]: [...prev.weapons, value],
    }));
  };

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add Weapons
      </Button>
      <SwipeableDrawer open={open} onClose={toggleOpen} fullWidth>
        <Stack>
          <DialogTitle>Weapons</DialogTitle>
          <List>
            {weapons.map((weapon) => (
              <ListItemButton onWeaponSelect={() => onWeaponSelect(weapon)}>
                {weapon.name}
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </SwipeableDrawer>
    </>
  );
}
