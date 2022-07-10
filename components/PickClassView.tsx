import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useClasses from "../hooks/useClasses";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { ListItemDrawer } from "./ListItemDrawer";

export function PickClassView() {
  const { data: classes, isLoading } = useClasses();
  const { characterClass: selectedCharacterClass, setCharacterClass } =
    useCharacterBuilderContext();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  const onSelectClass = (classToSelect) => {
    setCharacterClass(classToSelect.name);
  };

  return (
    <Grid container center>
      <List secondaryAction={<Button onClick={onSelectClass}>Select</Button>}>
        {classes.map((characterClass) => (
          <ListItem
            style={{ border: "10px" }}
            secondaryAction={
              <Button onClick={() => onSelectClass(characterClass)}>
                Select
              </Button>
            }
          >
            <ListItemDrawer content={characterClass} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
