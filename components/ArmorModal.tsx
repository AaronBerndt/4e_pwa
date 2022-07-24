import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
import useArmor from "../hooks/useArmor";
import {
  Skeleton,
  Button,
  Stack,
  DialogTitle,
  Dialog,
  DialogContent,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  DialogActions,
} from "../node_modules/@mui/material/index";
import { Armor, Gear } from "../types";
import { find, range } from "lodash";
import { useState } from "react";
import { DisplayCard } from "./DisplayCard";
import { useRouter } from "../node_modules/next/router";
import { useCharacterEditContext } from "../context/CharacterEditContext";

export function ArmorModal() {
  const { pathname } = useRouter();
  const { gear, setGear } = pathname.includes("edit")
    ? useCharacterEditContext()
    : useCharacterBuilderContext();

  const [baseArmor, setBaseArmor] = useState(null);
  const [enhancement, setEnhancement] = useState(0);
  const [magicArmor, setMagicArmor] = useState(null);

  const { data: armorList, isLoading }: any = useArmor();
  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  const onAddArmor = () =>
    setGear((prev: Armor) => ({
      ...prev,
      armor: {
        name: baseArmor?.name,
        enhancement,
        magicArmor: magicArmor?.name,
      },
    }));

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add Armor
      </Button>
      <Dialog open={open} onClose={toggleOpen} fullScreen>
        <DialogTitle>Armor</DialogTitle>
        <DialogContent>
          <Stack>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="armor">Base Armor</InputLabel>
              <Select
                id="armor"
                onChange={(e: any) => {
                  setBaseArmor(find(armorList, { name: e.target.value }));
                  setMagicArmor(null);
                }}
              >
                {armorList
                  .filter(({ type }) => !type.includes("Shield"))
                  .filter(({ rarity }) => rarity === "Mundane")
                  .map((item) => (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {baseArmor && (
              <>
                <DisplayCard htmlToRender={baseArmor.html} />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="enhancement">Enhancement</InputLabel>
                  <Select
                    id="enhancement"
                    onChange={(e: any) => setEnhancement(e.target.value)}
                  >
                    {range(1, 7).map((value) => (
                      <MenuItem value={value} key={value}>
                        + {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="magic">Magic Armor</InputLabel>
                  <Select
                    id="magic"
                    onChange={(e: any) =>
                      setMagicArmor(find(armorList, { name: e.target.value }))
                    }
                  >
                    {armorList
                      .filter(({ rarity }) => rarity !== "Mundane")
                      .filter(
                        ({ type: armorType }) => armorType === baseArmor.type
                      )
                      .map((item) => (
                        <MenuItem value={item.name} key={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {magicArmor && <DisplayCard htmlToRender={magicArmor.html} />}
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen}>Close</Button>
          <Button onClick={onAddArmor}>
            {gear["armor"] === "" ? "Add Armor" : "Change Armor"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
