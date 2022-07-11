import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useAncestries from "../hooks/useAncestries";
import usePowers from "../hooks/usePowers";
import {
  Button,
  Divider,
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
    paragonPath,
    epicDestiny,
    ancestry,
  } = useCharacterBuilderContext();

  const [filter, setFilter] = useState({ name: "", value: "" });

  const { data: powers, isLoading } = usePowers({
    characterClass,
    paragonPath,
    epicDestiny,
    ancestry,
    level,
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!powers) {
    return <div>No Data Found</div>;
  }

  const onSelectPowerAdd = (powerToSelect) =>
    setPowers((prev) => [...prev, powerToSelect.name]);

  const onSelectPowerRemove = (powerToSelect) =>
    setPowers((prev) =>
      prev.filter((powerName) => powerName !== powerToSelect.name)
    );

  return (
    <Grid container center xs={12}>
      <List>
        {powers.map((power) => (
          <Grid item xs={12} md={12}>
            <ListItem
              fullWidth
              style={{ border: "10px" }}
              secondaryAction={
                <>
                  {selectedPowers.includes(power.name) ? (
                    <Button onClick={() => onSelectPowerRemove(power)}>
                      Remove
                    </Button>
                  ) : (
                    <Button onClick={() => onSelectPowerAdd(power)}>Add</Button>
                  )}
                </>
              }
            >
              <ListItemDrawer content={power} />
            </ListItem>
            <Divider />
          </Grid>
        ))}
      </List>
    </Grid>
  );
}
