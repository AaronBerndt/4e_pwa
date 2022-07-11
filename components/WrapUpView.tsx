import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useCreateChracter from "../hooks/useCreateCharacter";
import { Button, Grid } from "../node_modules/@mui/material/index";

export function WrapupView() {
  const {
    name,
    level,
    ancestry,
    abilityScores,
    characterClass,
    paragonPath,
    epicDestiny,
    powers,
    feats,
    trainedSkills,
    gear,
    inventory,
    currency,
  } = useCharacterBuilderContext();
  const { mutate: createCharacter } = useCreateChracter();

  return (
    <Grid container center>
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

      <Button variant="contained" fullWidth onClick={createCharacter}>
        Create Character
      </Button>
    </Grid>
  );
}
