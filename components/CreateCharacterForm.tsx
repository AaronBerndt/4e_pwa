import { range, capitalize } from "lodash";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "../node_modules/@mui/material/index";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";

export function CreateCharacterForm() {
  const { name, level, setLevel, setName, abilityScores, setAbilityScores } =
    useCharacterBuilderContext();

  return (
    <Stack center spacing={2} style={{ padding: "15px" }}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="levelLabel">Level</InputLabel>
        <Select
          labelId="levelLabel"
          value={level}
          label="level"
          onChange={(e) => setLevel(e.target.value)}
        >
          {range(1, 31).map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
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
        <FormControl fullWidth>
          <InputLabel id={abilityScore}>{capitalize(abilityScore)}</InputLabel>
          <Select
            fullWidth
            id={abilityScore}
            value={abilityScores[abilityScore]}
            onChange={(e) =>
              setAbilityScores((prev) => ({
                ...prev,
                [abilityScore]: e.target.value,
              }))
            }
          >
            {range(1, 31).map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Stack>
  );
}
