import { useState } from "react";
import { range } from "lodash";
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
  Step,
  StepButton,
  StepLabel,
  Stepper,
  TextField,
} from "../../node_modules/@mui/material/index";
import { CharacterState } from "../../types";
import { HealthWorkSpace } from "./Spaces";
import { GiDeathSkull } from "react-icons/gi";
import useUpdateDeathSaves from "../../hooks/useUpdateDeathSaves";

type Props = {
  hitpoints: number;
  surges: number;
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

const DeathSaveMarker = styled.span`
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`;

export function HealthWorkspaceModal({
  hitpoints,
  surges,
  characterState,
  _id,
}: Props) {
  const hitpointsRemaining = hitpoints - characterState.damage;
  const { open, toggleOpen } = useToggle();
  const [value, setValue] = useState(0);
  const { mutate: updateCharacterHitPoints } = useUpdateHitPoints();
  const { mutate: updateDeathSaves } = useUpdateDeathSaves();

  const onClick = (type) =>
    updateCharacterHitPoints({
      healthChangeAmount: Number(value),
      _id,
      type,
      hitpoints,
    });

  return (
    <>
      <Button onClick={toggleOpen} variant="contained" size="small">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <span>
            {hitpointsRemaining} / {hitpoints}
            {characterState.temporaryHitpoints
              ? ` (${characterState.temporaryHitpoints})`
              : null}
          </span>
          <span>Hit Points</span>
          <Stack direction="row" spacing={1}>
            {range(characterState.deathSaves).map((i) => (
              <GiDeathSkull key={i} />
            ))}
          </Stack>
        </Stack>
      </Button>
      <Dialog open={open} fullScreen>
        <DialogTitle>Health Workspace</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <HealthWorkSpace
              hitpointsRemaining={hitpointsRemaining}
              temporaryHitpoints={characterState.temporaryHitpoints}
              hitpoints={hitpoints}
              surges={surges - characterState.expendedSurges}
            />

            {hitpointsRemaining <= 0 && (
              <>
                <Stepper
                  activeStep={characterState.deathSaves}
                  alternativeLabel
                >
                  {range(characterState.deathSaves).map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={GiDeathSkull} />
                    </Step>
                  ))}
                </Stepper>

                <ButtonGroup fullWidth>
                  <Button
                    variant="contained"
                    onClick={() => updateDeathSaves({ _id })}
                  >
                    Add
                  </Button>
                </ButtonGroup>
              </>
            )}

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
          <Button
            variant="contained"
            onClick={toggleOpen}
            fullWidth
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
