import { Button, Stack } from "../../node_modules/@mui/material/index";

type Props = {
  gear: any;
};

export function GearView({ gear }: Props) {
  return (
    <Stack>
      <Button fullWidth variant="contained">
        Manage Gear
      </Button>
    </Stack>
  );
}
