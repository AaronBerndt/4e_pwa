import { range, capitalize } from "lodash";
import {
  FormControl,
  Grid,
  InputLabel,
  option,
  NativeSelect,
  Stack,
  TextField,
} from "../node_modules/@mui/material/index";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import { useRouter } from "../node_modules/next/router";
import { useCharacterEditContext } from "../context/CharacterEditContext";

export function CreateCharacterForm() {
  const { pathname } = useRouter();
  const editCharacter = useCharacterEditContext();
  const { name, level, setLevel, setName, abilityScores, setAbilityScores } =
    useCharacterBuilderContext();

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={name}
        onChange={(e: any) => {
          setName(e.target.value);
        }}
      />
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="levelLabel">
          Level
        </InputLabel>
        <NativeSelect
          value={level}
          inputProps={{
            name: "level",
            id: "levelLabel",
          }}
          onChange={(e: any) => setLevel(e.target.value)}
        >
          {range(1, 31).map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <h1>Character Attributes</h1>
      {[
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ].map((abilityScore) => (
        <FormControl fullWidth key={abilityScore}>
          <InputLabel variant="standard" htmlFor={abilityScore}>
            {capitalize(abilityScore)}
          </InputLabel>
          <NativeSelect
            id={abilityScore}
            value={abilityScores[abilityScore]}
            inputProps={{
              name: abilityScore,
              id: abilityScore,
            }}
            onChange={(e: any) =>
              setAbilityScores((prev) => ({
                ...prev,
                [abilityScore]: e.target.value,
              }))
            }
          >
            {range(1, 31).map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      ))}
    </Stack>
  );
}
