import usePowers from "../hooks/usePowers";
import {
  Avatar,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
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
  const { level, name, characterClass } = formik.values;
  return (
    <Grid center>
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
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="characterClassLabel">Class</InputLabel>
          <Select
            labelId="characterClassLabel"
            value={characterClass}
            label="Class"
            onChange={formik.handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
