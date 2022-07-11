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
import { Gear } from "../types";

export function ArmorModal({ type }) {
  const { gear, setGear } = useCharacterBuilderContext();
  const { data: armorList, isLoading } = useArmor();
  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  const onArmorSelect = (value: string) => {
    setGear((prev: Gear) => ({
      ...prev,
      [type.toLowerCase()]: value,
    }));
  };

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
                <ListItemButton onClick={() => onArmorSelect(item)}>
                  {item.name}
                </ListItemButton>
              ))}
          </List>
        </Stack>
      </SwipeableDrawer>
    </>
  );
}
