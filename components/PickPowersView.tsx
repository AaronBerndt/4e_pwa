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
import { Power } from "../types";
import { ListItemDrawer } from "./ListItemDrawer";

export function PickPowersView() {
  const {
    powers: selectedPowers,
    setPowers,
    level,
    characterClass,
  } = useCharacterBuilderContext();

  const { data: powers, isLoading } = usePowers({
    characterClass,
    level,
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!powers) {
    return <div>No Data Found</div>;
  }

  const onSelectPowerAdd = (powerToSelect: Power) =>
    setPowers((prev: string[]) => [...prev, powerToSelect.name]);

  const onSelectPowerRemove = (powerToSelect: Power) =>
    setPowers((prev: string[]) =>
      prev.filter((powerName: string) => powerName !== powerToSelect.name)
    );

  return (
    <Grid container center xs={12}>
      <List>
        {powers.map((power: Power) => (
          <Grid item xs={12} md={12} key={power.name}>
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
