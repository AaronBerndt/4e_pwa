import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useCreateChracter from "../hooks/useCreateCharacter";
import { Button, Grid } from "../node_modules/@mui/material/index";

export function WrapupView() {
  const { name, level, characterClass } = useCharacterBuilderContext();
  const { mutate: createCharacter }: any = useCreateChracter();

  return (
    <Grid>
      <Grid item xs={12}>
        Name: {name}
      </Grid>
      <Grid item xs={12}>
        Level: {level}
      </Grid>
      <Grid item xs={12}>
        Class: {characterClass}
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => createCharacter}
      >
        Create Character
      </Button>
    </Grid>
  );
}
