import { range } from "lodash";
import { useState } from "react";
import { GiCampfire } from "react-icons/gi";
import styled from "styled-components";
import useRest from "../../hooks/useRest";
import useToggle from "../../hooks/useToggleOpen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Stack,
} from "../../node_modules/@mui/material/index";
type Props = {
  characterData: any;
};

const RestButton = styled(Button)`
  font-size: 12px;
`;

export default function FullRestModal({ characterData }: Props) {
  const { open, toggleOpen } = useToggle();
  const [isShortRest, setIsShortRest] = useState(false);
  const { mutate: rest } = useRest();
  const { _id, hitpoints, surgeValue, surgesPerDay, characterState } =
    characterData;

  const currentHitPoints = hitpoints - characterState.damage;

  const currentSurgeAmounts =
    surgesPerDay - characterData.characterState.expendedSurges;

  return (
    <>
      <Button onClick={toggleOpen} variant="contained" fullWidth>
        <GiCampfire size="2em" />
      </Button>

      <Dialog open={open} fullScreen>
        <DialogTitle>
          {isShortRest
            ? "How many surges do you want to spend?"
            : "What Rest To Take?"}
        </DialogTitle>
        <DialogContent>
          {isShortRest ? (
            <Stack spacing={2}>
              {range(1, 5).map((surgeAmount) => (
                <Button
                  variant="contained"
                  onClick={() => {
                    rest({
                      _id,
                      type: "short",
                      surgesToSpend: surgeAmount,
                      surgeValue,
                    });
                    toggleOpen();
                    setIsShortRest(false);
                  }}
                  disabled={currentSurgeAmounts < surgeAmount}
                  key={surgeAmount}
                >
                  Spend {surgeAmount}: New Hitpoint Total (
                  {currentHitPoints + surgeValue * surgeAmount >= hitpoints
                    ? hitpoints
                    : currentHitPoints + surgeValue * surgeAmount}
                  )
                </Button>
              ))}
            </Stack>
          ) : (
            <Stack spacing={2}>
              <RestButton
                variant="contained"
                onClick={() => {
                  rest({ _id: characterData._id, type: "full" });
                  toggleOpen();
                }}
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
                onClick={() => setIsShortRest((prev) => !prev)}
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
          )}
        </DialogContent>
        <DialogActions>
          {isShortRest && (
            <Button
              onClick={() => {
                setIsShortRest(false);
              }}
              fullWidth
              variant="contained"
              color="secondary"
            >
              Back to Rest Menu
            </Button>
          )}
        </DialogActions>
        <DialogActions>
          <Button
            onClick={() => {
              toggleOpen();
              setIsShortRest(false);
            }}
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
