import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "../../node_modules/@mui/material/index";

type Props = {
  gear: any;
};

export function GearView({ gear }: Props) {
  return (
    <Stack>
      <Button fullwidth variant="contained">
        Manage Gear
      </Button>
    </Stack>
  );
}
