import useToggle from "../../hooks/useToggleOpen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "../../node_modules/@mui/material/index";
import { CharacterState } from "../../types";

type Props = {
  hitpoints: number;
  characterState: CharacterState;
};

export function HealthWorkspaceModal({ hitpoints, characterState }: Props) {
  const hitpointsRemaining = hitpoints - characterState.damage;
  const { open, toggleOpen } = useToggle();
  return (
    <>
      <Button onClick={toggleOpen}>
        {hitpointsRemaining + characterState.temporaryHitpoints} / {hitpoints}
      </Button>
      <Dialog open={open}>
        <DialogTitle>Health Workspace</DialogTitle>
        <DialogActions>
          <Button onClick={toggleOpen}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
