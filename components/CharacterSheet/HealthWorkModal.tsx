import { useState } from "react";
import styled from "styled-components";
import useToggle from "../../hooks/useToggleOpen";
import useUpdateHitPoints from "../../hooks/useUpdateHitpoints";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "../../node_modules/@mui/material/index";
import { CharacterState } from "../../types";
import { HealthWorkSpace } from "./Spaces";

type Props = {
  hitpoints: number;
  characterState: CharacterState;
  _id: string;
};

const HealingButton = styled(Button)`
  background: #40d250;
  color: white;
`;
const DamageButton = styled(Button)`
  background: #c53131;
  color: white;
`;

const TemporaryHitPointsButton = styled(Button)`
  background: #d3d3d3;
  color: white;
`;

export function HealthWorkspaceModal({
  hitpoints,
  characterState,
  _id,
}: Props) {
  const hitpointsRemaining = hitpoints - characterState.damage;
  const { open, toggleOpen } = useToggle();
  const [value, setValue] = useState(0);
  const { mutate: updateCharacterHitPoints } = useUpdateHitPoints();

  const onClick = (type) =>
    updateCharacterHitPoints({ healthChangeAmount: Number(value), _id, type });

  return (
    <>
      <Button onClick={toggleOpen}>
        {hitpointsRemaining} / {hitpoints}
        {characterState.temporaryHitpoints
          ? `(${characterState.temporaryHitpoints})`
          : null}
      </Button>
      <Dialog open={open}>
        <DialogTitle>Health Workspace</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <HealthWorkSpace
              hitpointsRemaining={hitpointsRemaining}
              temporaryHitpoints={characterState.temporaryHitpoints}
              hitpoints={hitpoints}
            />
            <TextField
              type="number"
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <ButtonGroup fullWidth>
              <HealingButton
                variant="contained"
                onClick={() => onClick("heal")}
              >
                Heal
              </HealingButton>
              <DamageButton
                variant="contained"
                onClick={() => onClick("damage")}
              >
                Damage
              </DamageButton>
            </ButtonGroup>
            <TemporaryHitPointsButton
              variant="contained"
              onClick={() => onClick("add temporary hitpoints")}
            >
              Add Temp Hitpoints
            </TemporaryHitPointsButton>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={toggleOpen}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
