import { skillList } from "../constants";
import { orderBy } from "lodash";
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
        {orderBy(skillList, "name").map((skill) => (
          <>
            <ListItem
              dense
              style={{ border: "10px" }}
              secondaryAction={
                <>
                  {trainedSkills.includes(skill.name) ? (
                    <Button onClick={() => onSelectPowerRemove(skill.name)}>
                      Remove
                    </Button>
                  ) : (
                    <Button onClick={() => onSelectPowerAdd(skill.name)}>
                      Add
                    </Button>
                  )}
                </>
              }
            >
              <ListItemText primary={skill.name} secondary={skill.modifier} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Stack>
  );
}
