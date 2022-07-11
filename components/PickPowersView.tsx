import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import usePowers from "../hooks/usePowers";
import {
  Button,
  Divider,
  List,
  ListItem,
  Stack,
} from "../node_modules/@mui/material/index";
import { Power } from "../types";
import { ListItemDrawer } from "./ListItemDrawer";

export function PickPowersView() {
  const {
    powers: selectedPowers,
    setPowers,
    level,
    characterClass,
  } = useCharacterBuilderContext();

  const { data: powers, isLoading } = usePowers({
    characterClass,
    level,
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!powers) {
    return <div>No Data Found</div>;
  }

  const onSelectPowerAdd = (powerToSelect: Power) =>
    setPowers((prev: string[]) => [...prev, powerToSelect.name]);

  const onSelectPowerRemove = (powerToSelect: Power) =>
    setPowers((prev: string[]) =>
      prev.filter((powerName: string) => powerName !== powerToSelect.name)
    );

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <List>
        {powers.map((power: Power) => (
          <>
            <ListItem
              style={{ border: "10px" }}
              key={power.name}
              secondaryAction={
                <>
                  {selectedPowers.includes(power.name) ? (
                    <Button onClick={() => onSelectPowerRemove(power)}>
                      Remove
                    </Button>
                  ) : (
                    <Button onClick={() => onSelectPowerAdd(power)}>Add</Button>
                  )}
                </>
              }
            >
              <ListItemDrawer content={power} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Stack>
  );
}
