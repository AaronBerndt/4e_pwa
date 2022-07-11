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

export function WeaponsModal() {
  const { gear, setGear } = useCharacterBuilderContext();
  const { data: weapons, isLoading } = useWeapons();
  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add Weapons
      </Button>
      <SwipeableDrawer open={open} onClose={toggleOpen} fullWidth>
        <Stack>
          <DialogTitle>Weapons</DialogTitle>
          <List>
            {weapons.map((item) => (
              <ListItemButton>{item.name}</ListItemButton>
            ))}
          </List>
        </Stack>
      </SwipeableDrawer>
    </>
  );
}
