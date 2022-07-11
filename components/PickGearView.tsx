import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useArmor from "../hooks/useArmor";
import useWeapons from "../hooks/useWeapons";
import { Grid } from "../node_modules/@mui/material/index";

export function PickGearView() {
  const { gear, setGear } = useCharacterBuilderContext();

  return (
    <Grid container center>
      {Object.keys(gear).map((gearKey) => (
        <Grid item xs={12}>
          {gearKey}
        </Grid>
      ))}
    </Grid>
  );
}
