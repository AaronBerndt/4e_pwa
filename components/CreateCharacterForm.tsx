import useAncestries from "../hooks/useAncestries";
import useClasses from "../hooks/useClasses";
import useEpicDestinies from "../hooks/useEpicDestinies";
import useParagonPaths from "../hooks/useParagonPaths";
import usePowers from "../hooks/usePowers";
import { range, capitalize } from "lodash";
import {
  Avatar,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "../node_modules/@mui/material/index";
import { Form, Formik } from "../node_modules/formik/dist/index";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";

export function CreateCharacterForm({}) {
  const { name, level, setLevel, setName, abilityScores, setAbilityScores } =
    useCharacterBuilderContext();

  return (
    <Grid container center spacing={2} style={{ padding: "15px" }}>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
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
      </Grid>

      <Grid item xs={12}>
        <h1>Character Attributes</h1>
      </Grid>
      {[
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ].map((abilityScore) => (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id={abilityScore}>
              {capitalize(abilityScore)}
            </InputLabel>
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
        </Grid>
      ))}
    </Grid>
  );
}
