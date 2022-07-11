import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useClasses from "../hooks/useClasses";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { DisplayCard } from "./DisplayCard";
import { ListItemDrawer } from "./ListItemDrawer";
import { find } from "lodash";

export function PickClassView({ setActiveStep }) {
  const { data: classes, isLoading }: any = useClasses();
  const { characterClass: selectedCharacterClass, setCharacterClass } =
    useCharacterBuilderContext();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  const onSelectClass = (classToSelect) => {
    setCharacterClass(classToSelect.name);
    setActiveStep((prev) => prev + 1);
  };

  const onRemoveClass = () => setCharacterClass("");

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      {selectedCharacterClass !== "" ? (
        <>
          <DisplayCard
            htmlToRender={find(classes, { name: selectedCharacterClass }).html}
          />
          <Button variant="contained" onClick={onRemoveClass} fullWidth>
            Choose another Class
          </Button>
        </>
      ) : (
        <List>
          {classes.map((characterClass) => (
            <ListItem
              key={characterClass.name}
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
      )}
    </Stack>
  );
}
