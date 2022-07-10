import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useAncestries from "../hooks/useAncestries";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { DisplayCard } from "./DisplayCard";
import { ListItemDrawer } from "./ListItemDrawer";
import { find } from "lodash";

export function PickAncestryView() {
  const [filter, setFilter] = useState({ name: "", value: "" });
  const { data: ancestries, isLoading } = useAncestries();
  const { ancestry: selectedAncestry, setAncestry } =
    useCharacterBuilderContext();

  console.log(selectedAncestry);
  if (isLoading) {
    return <div>...Loading</div>;
  }

  const onSelectAncestry = (ancestryToSelect) =>
    setAncestry(ancestryToSelect.name);

  const onRemoveAncestry = () => setAncestry("");

  return (
    <Grid container center>
      {selectedAncestry !== "" ? (
        <>
          <DisplayCard
            htmlToRender={find(ancestries, { name: selectedAncestry }).html}
          />
          <Button variant="contained" onClick={onRemoveAncestry} fullWidth>
            Choose another Ancestry
          </Button>
        </>
      ) : (
        <List>
          {ancestries.map((ancestry) => (
            <Grid item xs={12} key={ancestry._id}>
              <ListItem
                style={{ border: "10px" }}
                secondaryAction={
                  <Button onClick={() => onSelectAncestry(ancestry)}>
                    Select
                  </Button>
                }
              >
                <ListItemDrawer content={ancestry} />
              </ListItem>
              <Divider />
            </Grid>
          ))}
        </List>
      )}
    </Grid>
  );
}
