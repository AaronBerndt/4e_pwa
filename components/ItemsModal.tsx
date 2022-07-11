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
} from "../node_modules/@mui/material/index";

export function ItemsModal({ gearName }) {
  const { gear, setGear } = useCharacterBuilderContext();
  const { data: items, isLoading } = useItems({
    category: gearName === "Rings" ? "Ring" : gearName,
  });

  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add {gearName}
      </Button>
      <SwipeableDrawer open={open} onClose={toggleOpen} fullWidth>
        <Stack>
          <DialogTitle>{gearName}</DialogTitle>
          <List>
            {items.map((item) => (
              <ListItemButton>{item.name}</ListItemButton>
            ))}
          </List>
        </Stack>
      </SwipeableDrawer>
    </>
  );
}
