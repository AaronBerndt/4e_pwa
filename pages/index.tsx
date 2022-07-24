import useCharacters from "../hooks/useCharacters";
import {
  Paper,
  Button,
  Grid,
  List,
  ListItemButton,
  Stack,
  ListItem,
  Skeleton,
  IconButton,
} from "../node_modules/@mui/material/index";
import Link from "../node_modules/next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export default function CharactersPage() {
  const { data: characters, isLoading } = useCharacters();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <List>
          {characters.map((character, i) => (
            <ListItem
              key={character._id}
              secondaryAction={
                <Stack direction="row" spacing={2}>
                  <Link href={`/characters/edit/${character._id}`}>
                    <IconButton edge="end" aria-label="comments">
                      <AiOutlineEdit />
                    </IconButton>
                  </Link>
                  <IconButton edge="end" aria-label="comments">
                    <BsFillTrashFill />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemButton>
                <Link href={`/characters/${character._id}`}>
                  <a>{character.name}</a>
                </Link>
              </ListItemButton>
            </ListItem>
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
