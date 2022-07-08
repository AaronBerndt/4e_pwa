import {
  FormControl,
  Grid,
  InputLabel,
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
