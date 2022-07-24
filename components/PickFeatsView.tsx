import { useState } from "react";
import { find, orderBy } from "lodash";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import {
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  Stack,
  TextField,
} from "../node_modules/@mui/material/index";
import { Feat } from "../types";
import { ListItemDrawer } from "./ListItemDrawer";
import { useCharacterEditContext } from "../context/CharacterEditContext";
import { useRouter } from "../node_modules/next/router";

export function PickFeatsView({ feats, ancestries, classes }) {
  const { pathname } = useRouter();
  const {
    feats: selectedFeats,
    powers,
    setFeats,
    characterClass,
    ancestry,
    abilityScores,
    level,
    trainedSkills,
  } = pathname.includes("edit")
    ? useCharacterEditContext()
    : useCharacterBuilderContext();

  const [featTypeFilter, setFeatTypeFilter] = useState<any>("Heroic");
  const [featFilter, setFeatFilter] = useState<any>("Others");
  const [search, setSearch] = useState<any>("");

  const onSelectFeatAdd = (featToSelect: Feat) =>
    setFeats((prev: string[]) => [...prev, featToSelect.name]);

  const onSelectFeatRemove = (featToSelect: Feat) =>
    setFeats((prev: string[]) =>
      prev.filter((featName) => featName !== featToSelect.name)
    );

  const genericFeats = orderBy(
    feats
      .filter(({ tier }: Feat) => tier === featTypeFilter)
      .filter(({ prerequisite }) => prerequisite === "")
      .filter(({ name, prereq }) => {
        const regex = new RegExp(search, "i");
        return regex.test(name) || regex.test(prereq);
      }),
    "name"
  );

  const featsFilteredByChoices = orderBy(
    feats
      .filter(({ tier }: Feat) => tier === featTypeFilter)
      .filter(({ prerequisite }) => prerequisite !== "")
      .filter(({ prerequisite }) => {
        const prerequisiteList = prerequisite
          .split(",")
          .map((prereq) => prereq.trim().toLowerCase());

        const ancestryObject = find(ancestries, { name: ancestry }) || {
          origin: "None",
        };

        const classesObject = find(classes, { name: characterClass }) || {
          role: "None",
          powerSource: "None",
        };

        return prerequisiteList.every((prereq) => {
          return [
            characterClass.toLowerCase(),
            ancestry.toLowerCase(),
            ancestryObject?.origin.toLowerCase(),
            classesObject?.powerSource.toLowerCase(),
            classesObject?.role.toLowerCase(),
            ...powers.map((power: string) => power.toLowerCase()),
            ...selectedFeats.map((selectedFeat: string) =>
              selectedFeat.toLowerCase()
            ),
            ...trainedSkills.map((trainedSkill: string) =>
              trainedSkill.toLowerCase()
            ),
          ].some((choice: string) => {
            const regex = new RegExp(choice);
            return regex.test(prereq);
          });
        });
      })
      .filter(({ name, prerequisite }) => {
        const regex = new RegExp(search, "i");
        return regex.test(name) || regex.test(prerequisite);
      }),
    "name"
  );

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <ButtonGroup fullWidth>
        <Button
          color={featTypeFilter === "Heroic" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("Heroic")}
        >
          Heroic
        </Button>
        <Button
          color={featTypeFilter === "Paragon" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("Paragon")}
          disabled={level >= 11}
        >
          Paragon
        </Button>
        <Button
          color={featTypeFilter === "Epic" ? "secondary" : "primary"}
          onClick={() => setFeatTypeFilter("Epic")}
          disabled={level >= 21}
        >
          Epic
        </Button>
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button
          color={featFilter === "General" ? "secondary" : "primary"}
          onClick={() => setFeatFilter("General")}
        >
          General
        </Button>
        <Button
          color={featFilter === "Others" ? "secondary" : "primary"}
          onClick={() => setFeatFilter("Others")}
        >
          By Class, Ancestry, Powers
        </Button>
      </ButtonGroup>

      <TextField
        fullWidth
        label="Search Feats by Name, Prerequisite"
        onChange={(e) => setSearch(e.target.value)}
      />

      <List>
        {orderBy(
          [
            ...(featFilter === "Others"
              ? featsFilteredByChoices
              : genericFeats),
          ],
          "name"
        ).map((feat: Feat) => (
          <>
            <ListItem
              dense
              style={{ border: "10px" }}
              secondaryAction={
                <>
                  {selectedFeats.includes(feat.name) ? (
                    <Button onClick={() => onSelectFeatRemove(feat)}>
                      Remove
                    </Button>
                  ) : (
                    <Button onClick={() => onSelectFeatAdd(feat)}>Add</Button>
                  )}
                </>
              }
            >
              <ListItemDrawer content={feat} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Stack>
  );
}
