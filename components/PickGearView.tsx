import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import { Stack } from "../node_modules/@mui/material/index";
import { ArmorModal } from "./ArmorModal";
import { ItemsModal } from "./ItemsModal";
import { WeaponsModal } from "./WeaponsModal";
import { capitalize } from "lodash";

export function PickGearView() {
  const { gear, setGear } = useCharacterBuilderContext();

  return (
    <Stack spacing={2}>
      {Object.keys(gear).map((gearName) => (
        <>
          {gearName === "weapons" ? (
            <WeaponsModal />
          ) : gearName === "armor" ? (
            <ArmorModal type="Armor" />
          ) : gearName === "shield" ? (
            <ArmorModal type="Shield" />
          ) : (
            <ItemsModal gearName={capitalize(gearName)} />
          )}
        </>
      ))}
    </Stack>
  );
}
