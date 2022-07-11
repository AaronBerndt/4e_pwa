import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useAncestries from "../hooks/useAncestries";
import useTrainedSkills from "../hooks/useTrainedSkills";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { ListItemDrawer } from "./ListItemDrawer";

export function PickTrainedSkillsView() {
  const skillList = [
    "Acrobatics",
    "Arcana",
    "Athletics",
    "Bluff",
    "Diplomacy",
    "Dungeoneering",
    "Endurance",
    "Heal",
    "History",
    "Insight",
    "Intimidate",
    "Nature",
    "Perception",
    "Religion",
    "Stealth",
    "Streetwise",
    "Thievery",
  ];
  const { trainedSkills, setTrainedSkills } = useCharacterBuilderContext();

  const onSelectPowerAdd = (skillToSelect) =>
    setTrainedSkills((prev) => [...prev, skillToSelect]);

  const onSelectPowerRemove = (skillToSelect) =>
    setTrainedSkills((prev) =>
      prev.filter((skillName) => skillName !== skillToSelect)
    );

  return (
    <Grid container center xs={12}>
      <Grid item xs={12} md={12}>
        <List>
          {skillList.map((skill) => (
            <>
              <ListItem
                fullWidth
                style={{ border: "10px" }}
                secondaryAction={
                  <>
                    {trainedSkills.includes(skill) ? (
                      <Button onClick={() => onSelectPowerRemove(skill)}>
                        Remove
                      </Button>
                    ) : (
                      <Button onClick={() => onSelectPowerAdd(skill)}>
                        Add
                      </Button>
                    )}
                  </>
                }
              >
                <ListItemText primary={skill} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
