import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useParagonPaths from "../hooks/useParagonPaths";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { DisplayCard } from "./DisplayCard";
import { ListItemDrawer } from "./ListItemDrawer";
import { find } from "lodash";

export function PickParagonPathView() {
  const {
    paragonPath: selectedParagonPath,
    setCharacterParagonPath,
    ancestry,
    className,
  } = useCharacterBuilderContext();
  const { data: paragonPaths, isLoading } = useParagonPaths({
    ancestry,
    className,
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  const onSelectParagonPath = (classToSelect) =>
    setCharacterParagonPath(classToSelect.name);

  const onRemoveParagonPath = () => setCharacterParagonPath("");

  return (
    <Grid container center>
      {selectedParagonPath !== "" ? (
        <>
          <DisplayCard
            htmlToRender={
              find(paragonPaths, { name: selectedParagonPath }).html
            }
          />
          <Button variant="contained" onClick={onRemoveParagonPath} fullWidth>
            Choose another Paragon Path
          </Button>
        </>
      ) : (
        <List
          secondaryAction={
            <Button onClick={onSelectParagonPath}>Select</Button>
          }
        >
          {paragonPaths.map((paragonPath) => (
            <ListItem
              style={{ border: "10px" }}
              secondaryAction={
                <Button onClick={() => onSelectParagonPath(paragonPath)}>
                  Select
                </Button>
              }
            >
              <ListItemDrawer content={paragonPath} />
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  );
}
