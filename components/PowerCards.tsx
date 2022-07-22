import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Cards } from "../types";
import { DisplayCard, PowerDisplayCard } from "./DisplayCard";
import { chunk } from "lodash";
import {
  Button,
  ButtonGroup,
  Stack,
} from "../node_modules/@mui/material/index";
import { useState } from "react";

type Props = {
  _id: string;
  cards: Cards;
  expendedPowers: string[];
};
export function PowerCards({ cards, expendedPowers, _id }: Props) {
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
      {cardObject[powerFilter].map((card) => {
        const regex = /<h1 class=(.*?)>(.*?)<\/h1>(.*)/;
        const result = regex.exec(card.html);
        const string = `<h1 className=${result[1]}>
              ${card.name}
              ${powerFilter === "atWills" ? "" : `<input />`}
            </h1>`;

        console.log(`${string}${result[3]}`);
        return (
          <>
            <PowerDisplayCard
              _id={_id}
              powerName={card.name}
              htmlToRender={`${string}${result[3]}`}
              expendedPowers={expendedPowers}
              key={card.name}
            />
          </>
        );
      })}
    </Stack>
  );
}
