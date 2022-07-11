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

export function PickAncestryView({ setActiveStep }) {
  const [filter, setFilter] = useState({ name: "", value: "" });
  const { data: ancestries, isLoading } = useAncestries();

  const { ancestry: selectedAncestry, setAncestry } =
    useCharacterBuilderContext();

  const onSelectAncestry = (ancestryToSelect) => {
    setAncestry(ancestryToSelect.name);
    setActiveStep((prev) => prev + 1);
  };

  const onRemoveAncestry = () => setAncestry("");

  if (isLoading) {
    return <p>...Loading</p>;
  }

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
        <Grid item xs={12}>
          <List>
            {ancestries.map((ancestry) => (
              <>
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
              </>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}
