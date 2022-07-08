import useCharacters, { useCharacter } from "../../hooks/useCharacters";
import usePowers from "../../hooks/usePowers";
import { Button, Grid, Paper } from "../../node_modules/@mui/material/index";
import Link from "../../node_modules/next/link";

export default function CreateCharacterPage() {
  const { data: powers } = usePowers();
  return (
    <Grid>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Link href="characters/create" passHref>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {}}
            fullWidth
          >
            Create New Character
          </Button>
        </Link>
      </Paper>
    </Grid>
  );
}
