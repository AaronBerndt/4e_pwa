import useCharacters from "../hooks/useCharacters";
import {
  Paper,
  Button,
  Grid,
  List,
  ListItemButton,
  Stack,
  ListItem,
} from "../node_modules/@mui/material/index";
import Link from "../node_modules/next/link";

export default function CharactersPage() {
  const { data: characters } = useCharacters();

  return (
    <Stack center spacing={2} style={{ padding: "15px" }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <List>
          {characters.map((character) => (
            <ListItemButton>
              <Link href={`/characters/${character._id}`}>
                <a>{character.name}</a>
              </Link>
            </ListItemButton>
          ))}
        </List>
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
    </Stack>
  );
}
