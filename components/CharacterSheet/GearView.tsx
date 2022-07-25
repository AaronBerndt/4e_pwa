import { Button, Link, Stack } from "../../node_modules/@mui/material/index";

type Props = {
  gear: any;
  _id: string;
};

export function GearView({ gear, _id }: Props) {
  return (
    <Stack>
      <Link href={`/characters/editGear/${_id}`}>
        <Button fullWidth variant="contained">
          Manage Gear
        </Button>
      </Link>
    </Stack>
  );
}
