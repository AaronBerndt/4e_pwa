import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import { useCharacterEditContext } from "../context/CharacterEditContext";
import useCreateChracter from "../hooks/useCreateCharacter";
import useEditCharacter from "../hooks/useEditCharacter";
import { Button, Grid, Link } from "../node_modules/@mui/material/index";
import { useRouter } from "../node_modules/next/router";

export function WrapupView() {
  const { pathname, query } = useRouter();
  const { name, level, characterClass } = useCharacterBuilderContext();

  const { mutate: createCharacter }: any = useCreateChracter();
  const { mutate: editCharacter }: any = useEditCharacter(query.slug);

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

      <Link href={`/`}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() =>
            pathname.includes("edit") ? editCharacter() : createCharacter()
          }
        >
          {pathname.includes("edit") ? "Edit" : "Create"} Character
        </Button>
      </Link>
    </Grid>
  );
}
