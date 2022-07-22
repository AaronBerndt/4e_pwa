import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Cards } from "../types";
import { DisplayCard } from "./DisplayCard";
import { chunk } from "lodash";
import {
  Button,
  ButtonGroup,
  Stack,
} from "../node_modules/@mui/material/index";
import { useState } from "react";

type Props = {
  cards: Cards;
};
export function PowerCards({ cards }: Props) {
  const [powerFilter, setPowerFilter] = useState("atWills");
  const cardObject = {
    atWills: cards.filter((card) => card.type.match(/At-Will/)),
    encounters: cards.filter((card) => card.type.match(/Enc/)),
    dailies: cards.filter((card) => card.type.match(/Daily/)),
  };

  const onClick = (type: string) => setPowerFilter(type);
  return (
    <Stack>
      <ButtonGroup fullwidth>
        <Button
          color={powerFilter === "atWills" ? "secondary" : "primary"}
          onClick={() => onClick("atWills")}
        >
          At Wills
        </Button>
        <Button
          color={powerFilter === "encounters" ? "secondary" : "primary"}
          onClick={() => onClick("encounters")}
        >
          Encounters
        </Button>
        <Button
          color={powerFilter === "dailies" ? "secondary" : "primary"}
          onClick={() => onClick("dailies")}
        >
          Daily
        </Button>
      </ButtonGroup>
      {cardObject[powerFilter].map((card) => (
        <DisplayCard htmlToRender={card.html} key={card.name} />
      ))}
    </Stack>
  );
}
