import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useAncestries from "../hooks/useAncestries";
import useFeats from "../hooks/useFeats";
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

export function PickFeatsView() {
  const {
    feats: selectedFeats,
    setFeats,
    characterClass,
    ancestry,
  } = useCharacterBuilderContext();

  const [filter, setFilter] = useState({ name: "", value: "" });
  const {
    data: feats,
    isLoading,
    refetch,
  } = useFeats({ ancestry, characterClass });

  if (feats === [] && ancestry && characterClass && !isLoading) {
    refetch();
  }

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!feats) {
    return <div>No Data Found</div>;
  }

  const onSelectFeatAdd = (featToSelect) =>
    setFeats((prev) => [...prev, featToSelect.name]);

  const onSelectFeatRemove = (featToSelect) =>
    setFeats((prev) =>
      prev.filter((featName) => featName !== featToSelect.name)
    );

  return (
    <Grid container center xs={12}>
      <Grid item xs={12} md={12}>
        <List>
          {feats.map((feat) => (
            <>
              <ListItem
                fullWidth
                style={{ border: "10px" }}
                secondaryAction={
                  <>
                    {selectedFeats.includes(feat.name) ? (
                      <Button onClick={() => onSelectFeatRemove(feat)}>
                        Remove
                      </Button>
                    ) : (
                      <Button onClick={() => onSelectFeatAdd(feat)}>Add</Button>
                    )}
                  </>
                }
              >
                <ListItemDrawer content={feat} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
