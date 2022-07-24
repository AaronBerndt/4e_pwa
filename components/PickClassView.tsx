import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import {
  Button,
  Divider,
  List,
  ListItem,
  Stack,
} from "../node_modules/@mui/material/index";
import { DisplayCard } from "./DisplayCard";
import { ListItemDrawer } from "./ListItemDrawer";
import { find, orderBy } from "lodash";
import { useRouter } from "../node_modules/next/router";
import { useCharacterEditContext } from "../context/CharacterEditContext";

export function PickClassView({ setActiveStep, classes }) {
  const { pathname } = useRouter();
  const { characterClass: selectedCharacterClass, setCharacterClass } =
    pathname.includes("edit")
      ? useCharacterEditContext()
      : useCharacterBuilderContext();

  const onSelectClass = (classToSelect) => {
    setCharacterClass(classToSelect.name);
    setActiveStep((prev) => prev + 1);
  };

  const onRemoveClass = () => setCharacterClass("");

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      {selectedCharacterClass !== "" ? (
        <>
          <Button variant="contained" onClick={onRemoveClass} fullWidth>
            Choose another Class
          </Button>
          <DisplayCard
            htmlToRender={find(classes, { name: selectedCharacterClass }).html}
          />
        </>
      ) : (
        <List>
          {orderBy(classes, "name").map((characterClass) => (
            <>
              <ListItem
                dense
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
              <Divider />
            </>
          ))}
        </List>
      )}
    </Stack>
  );
}
