import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useAncestries from "../hooks/useAncestries";
import usePowers from "../hooks/usePowers";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { ListItemDrawer } from "./ListItemDrawer";

export function PickPowersView() {
  const {
    powers: selectedPowers,
    setPowers,
    level,
    characterClass,
    paragonPaths,
    epicDestiny,
    ancestry,
  } = useCharacterBuilderContext();

  const [filter, setFilter] = useState({ name: "", value: "" });
  const { data: powers, isLoading } = usePowers();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  const onSelectPower = (powerToSelect) => {
    setPowers(powerToSelect);
  };

  return (
    <Grid container center>
      <List>
        {powers.map((power) => (
          <Grid item xs={12}>
            <ListItem
              style={{ border: "10px" }}
              secondaryAction={
                <Button onClick={() => onSelectPower(power)}>Add</Button>
              }
            >
              <ListItemDrawer content={power} />
            </ListItem>
          </Grid>
        ))}
      </List>
    </Grid>
  );
}
