import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useArmor from "../hooks/useArmor";
import useWeapons from "../hooks/useWeapons";
import { Button, Grid, Stack } from "../node_modules/@mui/material/index";

export function PickGearView() {
  const { gear, setGear } = useCharacterBuilderContext();

  return (
    <Stack spacing={2}>
      {Object.keys(gear).map((gearKey) => (
        <Button fullWidth variant="contained">
          {gearKey}
        </Button>
      ))}
    </Stack>
  );
}
