import { GiCampfire } from "react-icons/gi";
import styled from "styled-components";
import useRest from "../../hooks/useRest";
import useToggle from "../../hooks/useToggleOpen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "../../node_modules/@mui/material/index";
type Props = {
  _id: string;
};

const RestButton = styled(Button)`
  font-size: 12px;
`;

export default function FullRestModal({ _id }: Props) {
  const { open, toggleOpen } = useToggle();
  const { mutate: rest } = useRest();

  return (
    <>
      <Button onClick={toggleOpen} variant="contained" fullWidth>
        <GiCampfire size="2em" />
      </Button>

      <Dialog open={open} fullScreen>
        <DialogContent>
          <Stack space spacing={2}>
            <RestButton
              variant="contained"
              onClick={() => rest({ _id, type: "full" })}
            >
              <Stack>
                <h3>Full Rest</h3>
                <List>
                  <ListItem sx={{ display: "list-item" }}>
                    Restore Hitpoints to full and regain all Healing Surges
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    Regain use of all Daily and Encounter Powers
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    Lose all Death Saves
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    Restore Secound Wind and one Action Point
                  </ListItem>
                </List>
              </Stack>
            </RestButton>
            <RestButton
              variant="contained"
              onClick={() => rest({ _id, type: "full" })}
            >
              <Stack>
                <h3>Short Rest</h3>
                <List>
                  <ListItem sx={{ display: "list-item" }}>
                    Spend Healing surges to heal
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    Regain use of all Encounter Powers
                  </ListItem>

                  <ListItem sx={{ display: "list-item" }}>
                    Restore Secound Wind
                  </ListItem>
                </List>
              </Stack>
            </RestButton>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleOpen}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
