import useAncestries from "../hooks/useAncestries";
import useClasses from "../hooks/useClasses";
import useEpicDestinies from "../hooks/useEpicDestinies";
import useParagonPaths from "../hooks/useParagonPaths";
import usePowers from "../hooks/usePowers";
import { range } from "lodash";
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
import { Field } from "../node_modules/formik/dist/Field";
import { Formik } from "../node_modules/formik/dist/Formik";

export function CreateCharacterForm({ formik }) {
  const { level, name, characterClass, ancestry, epicDestiny, paragonPath } =
    formik.values;
  const { data: ancestries, isLoading: ancestriesIsLoading } = useAncestries();
  const { data: epicDestinies, epicDestiniesIsLoading } = useEpicDestinies();
  const { data: classes, classesIsLoading } = useClasses();
  const { data: paragonPaths, paragonPathsIsLoading } = useParagonPaths();

  if (
    ancestriesIsLoading ||
    epicDestiniesIsLoading ||
    classesIsLoading ||
    paragonPathsIsLoading
  ) {
    return <LinearProgress />;
  }

  console.log(ancestries, epicDestinies, classes, paragonPaths);
  return (
    <Grid center spacing={2}>
      <Grid item>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={name}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="levelLabel">Level</InputLabel>
          <Select
            labelId="levelLabel"
            value={name}
            label="level"
            onChange={formik.handleChange}
          >
            {range(1, 30).map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="ancestryLabel">Ancestry</InputLabel>
          <Select
            labelId="ancestryLabel"
            value={characterClass}
            label="ancestry"
            onChange={formik.handleChange}
          >
            {ancestries.map((ancestry) => (
              <MenuItem value={ancestry._id} key={ancestry._id}>
                {ancestry.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="characterClassLabel">Class</InputLabel>
          <Select
            labelId="characterClassLabel"
            value={characterClass}
            label="class"
            onChange={formik.handleChange}
          >
            {classes.map((characterClass) => (
              <MenuItem value={characterClass._id} key={characterClass._id}>
                {characterClass.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="paragonPathLabel">Paragon Path</InputLabel>
          <Select
            labelId="paragonPathLabel"
            value={paragonPath}
            label="paragonPath"
            onChange={formik.handleChange}
          >
            {paragonPaths.map((paragonPath) => (
              <MenuItem value={paragonPath._id} key={paragonPath._id}>
                {paragonPath.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="epicDestiniesLabel">Epic Destiny</InputLabel>
          <Select
            labelId="epicDestiniesLabel"
            value={epicDestiny}
            label="epicDestiny"
            onChange={formik.handleChange}
          >
            {epicDestinies.map((epicDestiny) => (
              <MenuItem value={epicDestiny._id} key={epicDestiny._id}>
                {epicDestiny.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export function PowersForm({ formik }) {
  console.log(formik);
  const { powers: characterPowers, characterClass } = formik.values;

  const { data: powers, isLoading } = usePowers(characterClass);

  return (
    <Grid center>
      <List>
        {characterPowers.map((power) => (
          <ListItem
            key={power.name}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => formik.setFieldValue("characterPowers", [])}
                checked={characterPowers.includes(power._id)}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={power.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
