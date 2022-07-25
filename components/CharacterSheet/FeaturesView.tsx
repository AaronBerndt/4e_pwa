import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Stack,
} from "../../node_modules/@mui/material/index";
import { DisplayCard } from "../DisplayCard";

export default function FeaturesView({ characterData }) {
  const [featureFilter, setFeatureFilter] = useState("feat");
  const onClick = (type: string) => setFeatureFilter(type);
  return (
    <Stack>
      <ButtonGroup fullWidth>
        <Button
          variant={featureFilter === "feat" ? "contained" : "outlined"}
          color={featureFilter === "feat" ? "secondary" : "primary"}
          onClick={() => onClick("feat")}
        >
          At Wills
        </Button>
        <Button
          variant={featureFilter === "class" ? "contained" : "outlined"}
          color={featureFilter === "class" ? "secondary" : "primary"}
          onClick={() => onClick("class")}
        >
          class
        </Button>
        <Button
          variant={featureFilter === "ancestry" ? "contained" : "outlined"}
          color={featureFilter === "ancestry" ? "secondary" : "primary"}
          onClick={() => onClick("ancestry")}
        >
          Ancestry
        </Button>
      </ButtonGroup>
      {featureFilter === "feat" && (
        <>
          <h2>Feats</h2>
          {characterData.feats.map(({ html }) => (
            <DisplayCard htmlToRender={html} />
          ))}
        </>
      )}
      {featureFilter === "class" && (
        <>
          <h2>Class Info</h2>
          <DisplayCard htmlToRender={characterData.class} />
        </>
      )}
      {featureFilter === "ancestry" && (
        <>
          <h2>Ancestry Info</h2>
          <DisplayCard htmlToRender={characterData.ancestry} />
        </>
      )}
    </Stack>
  );
}
