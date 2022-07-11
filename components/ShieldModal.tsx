import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import useToggle from "../hooks/useToggleOpen";
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
import { Gear } from "../types";
import { find, range } from "lodash";
import { useState } from "react";
import { DisplayCard } from "./DisplayCard";
import useArmor from "../hooks/useArmor";

export function ShieldModal() {
  const { gear, setGear } = useCharacterBuilderContext();
  const [baseShield, setBaseShield] = useState(null);
  const [enhancement, setEnhancement] = useState(0);
  const [magicShield, setMagicShield] = useState(null);

  const { data: armorList, isLoading }: any = useArmor();
  const { open, toggleOpen } = useToggle();

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  const onShieldSelect = (value) => {
    setGear((prev: Gear) => ({
      ...prev,
      shield: { name: value.name, enhacement: 0 },
    }));
  };

  const onAddShield = () =>
    setGear((prev) => ({
      ...prev,
      shield: {
        name: baseShield.name,
        enhancement,
        magicShield: magicShield.name,
      },
    }));

  return (
    <>
      <Button fullWidth variant="contained" onClick={toggleOpen}>
        Add Shield
      </Button>
      <Dialog open={open} onClose={toggleOpen} fullScreen>
        <DialogTitle>Shield</DialogTitle>
        <DialogContent>
          <Stack>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="armor">Base Shield</InputLabel>
              <Select
                id="armor"
                onChange={(e: any) => {
                  setBaseShield(find(armorList, { name: e.target.value }));
                  setMagicShield(null);
                }}
              >
                {armorList
                  .filter(({ type }) => type.includes("Shield"))
                  .filter(({ rarity }) => rarity === "Mundane")
                  .map((item) => (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {baseShield && (
              <>
                <DisplayCard htmlToRender={baseShield.html} />
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
                  <InputLabel id="magic">Magic Shield</InputLabel>
                  <Select
                    id="magic"
                    onChange={(e: any) =>
                      setMagicShield(find(armorList, { name: e.target.value }))
                    }
                  >
                    {armorList
                      .filter(({ rarity }) => rarity !== "Mundane")
                      .filter(({ type: armorType }) =>
                        /Shield/i.test(armorType)
                      )
                      .map((item) => (
                        <MenuItem value={item.name} key={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {magicShield && <DisplayCard htmlToRender={magicShield.html} />}
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen}>Close</Button>
          <Button onClick={onAddShield}>
            {gear["shield"] === "" ? "Add Shield" : "Change Shield"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
