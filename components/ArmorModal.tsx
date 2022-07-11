import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
import useArmor from "../hooks/useArmor";
import {
  Skeleton,
  Button,
  SwipeableDrawer,
  Stack,
  DialogTitle,
  List,
  ListItemButton,
} from "../node_modules/@mui/material/index";

export function ArmorModal({ type }) {
  const { gear, setGear } = useCharacterBuilderContext();
  const { data: armorList, isLoading } = useArmor();
  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add {type}
      </Button>
      <SwipeableDrawer open={open} onClose={toggleOpen} fullWidth>
        <Stack>
          <DialogTitle>{type}</DialogTitle>
          <List>
            {armorList
              .filter(({ name }) => name.includes(type))
              .map((item) => (
                <ListItemButton>{item.name}</ListItemButton>
              ))}
          </List>
        </Stack>
      </SwipeableDrawer>
    </>
  );
}
