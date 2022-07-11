import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "../node_modules/@mui/material/index";

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

  const onSelectPowerAdd = (skillToSelect: string) =>
    setTrainedSkills((prev: string[]) => [...prev, skillToSelect]);

  const onSelectPowerRemove = (skillToSelect: string) =>
    setTrainedSkills((prev: string[]) =>
      prev.filter((skillName) => skillName !== skillToSelect)
    );

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <List>
        {skillList.map((skill) => (
          <>
            <ListItem
              style={{ border: "10px" }}
              secondaryAction={
                <>
                  {trainedSkills.includes(skill) ? (
                    <Button onClick={() => onSelectPowerRemove(skill)}>
                      Remove
                    </Button>
                  ) : (
                    <Button onClick={() => onSelectPowerAdd(skill)}>Add</Button>
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
    </Stack>
  );
}
