import { useState } from "react";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import {
  Button,
  Divider,
  List,
  ListItem,
  Stack,
} from "../node_modules/@mui/material/index";
import { DisplayCard } from "./DisplayCard";
import { ListItemDrawer } from "./ListItemDrawer";
import { find, orderBy } from "lodash";
import { useRouter } from "../node_modules/next/router";
import { useCharacterEditContext } from "../context/CharacterEditContext";

export function PickAncestryView({ setActiveStep, ancestries }) {
  const { pathname } = useRouter();
  const [filter, setFilter] = useState({ name: "", value: "" });

  const { ancestry: selectedAncestry, setAncestry } = pathname.includes("edit")
    ? useCharacterEditContext()
    : useCharacterBuilderContext();

  const onSelectAncestry = (ancestryToSelect) => {
    setAncestry(ancestryToSelect.name);
    setActiveStep((prev) => prev + 1);
  };

  const onRemoveAncestry = () => setAncestry("");

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      {selectedAncestry !== "" ? (
        <>
          <Button variant="contained" onClick={onRemoveAncestry} fullWidth>
            Choose another Ancestry
          </Button>
          <DisplayCard
            htmlToRender={find(ancestries, { name: selectedAncestry }).html}
          />
        </>
      ) : (
        <List>
          {orderBy(ancestries, "name").map((ancestry) => (
            <div key={ancestry.name}>
              <ListItem
                dense
                style={{ border: "10px" }}
                secondaryAction={
                  <Button onClick={() => onSelectAncestry(ancestry)}>
                    Select
                  </Button>
                }
              >
                <ListItemDrawer content={ancestry} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Stack>
  );
}
