import {
  Button,
  Divider,
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
        {Object.entries(skills).map(([NAME, VALUE]: any) => (
          <>
            <ListItem dense key={NAME}>
              <ListItemText primary={NAME} />
              <ListItemSecondaryAction>
                <Button variant="outlined">{VALUE}</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Stack>
  );
}
