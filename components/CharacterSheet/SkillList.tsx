import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "../../node_modules/@mui/material/index";

type Props = {
  skills: any;
};

export function SkillList({ skills }: Props) {
  return (
    <Stack>
      <List>
        {Object.entries(skills).map(([NAME, VALUE]) => (
          <ListItem dense>
            <ListItemText primary={NAME} />
            <ListItemSecondaryAction>
              <Button>{VALUE}</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
