import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useAncestries from "../hooks/useAncestries";
import useFeats from "../hooks/useFeats";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { Feat } from "../types";
import { ListItemDrawer } from "./ListItemDrawer";

export function PickFeatsView() {
  const {
    feats: selectedFeats,
    powers,
    setFeats,
    characterClass,
    ancestry,
    abilityScores,
    level,
  } = useCharacterBuilderContext();
  const [featTypeFilter, setFeatTypeFilter] = useState<any>("All");

  const {
    data: feats,
    isLoading,
    refetch,
  } = useFeats({
    ancestry,
    characterClass,
    level,
    powerList: powers,
    featList: selectedFeats,
    abilityScores,
  });

  if (feats === [] && ancestry && characterClass && !isLoading) {
    refetch();
  }

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!feats) {
    return <div>No Data Found</div>;
  }

  const onSelectFeatAdd = (featToSelect: Feat) =>
    setFeats((prev: string[]) => [...prev, featToSelect.name]);

  const onSelectFeatRemove = (featToSelect: Feat) =>
    setFeats((prev: string[]) =>
      prev.filter((featName) => featName !== featToSelect.name)
    );

  const filteredFeats =
    featTypeFilter === "All"
      ? feats
      : feats.filter(({ tier }: Feat) => tier === featTypeFilter);

  return (
    <Stack center spacing={2} style={{ padding: "15px" }}>
      <ButtonGroup fullWidth>
        <Button
          color={featTypeFilter === "All" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("All")}
        >
          All
        </Button>
        <Button
          color={featTypeFilter === "Heroic" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("Heroic")}
        >
          Heroic
        </Button>
        <Button
          color={featTypeFilter === "Paragon" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("Paragon")}
        >
          Paragon
        </Button>
        <Button
          color={featTypeFilter === "Epic" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("Epic")}
        >
          Epic
        </Button>
      </ButtonGroup>

      <List>
        {filteredFeats.map((feat: Feat) => (
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
    </Stack>
  );
}
