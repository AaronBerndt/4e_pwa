import { useState } from "react";
import { groupBy } from "lodash";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import usePowers from "../hooks/usePowers";
import {
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  Stack,
  TextField,
} from "../node_modules/@mui/material/index";
import { Power } from "../types";
import { ListItemDrawer } from "./ListItemDrawer";
import { useCharacterEditContext } from "../context/CharacterEditContext";
import { useRouter } from "../node_modules/next/router";

export function PickPowersView() {
  const { pathname } = useRouter();
  const {
    powers: selectedPowers,
    setPowers,
    level,
    characterClass,
  } = pathname.includes("edit")
    ? useCharacterEditContext()
    : useCharacterBuilderContext();

  const [search, setSearch] = useState<any>("");
  const [powerFilter, setPowerFilter] = useState("atWills");

  const { data: powers, isLoading } = usePowers({
    characterClass,
    level: Number(level),
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!powers) {
    return <div>No Data Found</div>;
  }

  const powersObject = {
    atWills: powers.filter((card) => card.type.match(/At-Will/)),
    encounters: powers.filter((card) => card.type.match(/Enc/)),
    dailies: powers.filter((card) => card.type.match(/Daily/)),
  };

  const onSelectPowerAdd = (powerToSelect: Power) =>
    setPowers((prev: string[]) => [...prev, powerToSelect.name]);

  const onSelectPowerRemove = (powerToSelect: Power) =>
    setPowers((prev: string[]) =>
      prev.filter((powerName: string) => powerName !== powerToSelect.name)
    );

  const onClick = (type: string) => setPowerFilter(type);

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <ButtonGroup fullWidth>
        <Button
          color={powerFilter === "atWills" ? "secondary" : "primary"}
          onClick={() => onClick("atWills")}
        >
          At Wills
        </Button>
        <Button
          color={powerFilter === "encounters" ? "secondary" : "primary"}
          onClick={() => onClick("encounters")}
        >
          Encounters
        </Button>
        <Button
          color={powerFilter === "dailies" ? "secondary" : "primary"}
          onClick={() => onClick("dailies")}
        >
          Daily
        </Button>
      </ButtonGroup>

      <TextField
        fullWidth
        label="Search Powers by Name, Keywords"
        onChange={(e) => setSearch(e.target.value)}
      />

      <List>
        {Object.entries(
          groupBy(
            powersObject[powerFilter].filter(({ name, keywords, action }) => {
              const regex = new RegExp(search, "i");
              return regex.test(name) || regex.test(keywords);
            }),
            "level"
          )
        ).map(([NAME, VALUES]) => (
          <>
            <h2>Level: {NAME} </h2>
            {VALUES.map((power) => (
              <>
                <ListItem
                  dense
                  style={{ border: "10px" }}
                  key={power.name}
                  secondaryAction={
                    <>
                      {selectedPowers.includes(power.name) ? (
                        <Button onClick={() => onSelectPowerRemove(power)}>
                          Remove
                        </Button>
                      ) : (
                        <Button onClick={() => onSelectPowerAdd(power)}>
                          Add
                        </Button>
                      )}
                    </>
                  }
                >
                  <ListItemDrawer content={power} />
                </ListItem>
                <Divider />
              </>
            ))}
          </>
        ))}
      </List>
    </Stack>
  );
}
