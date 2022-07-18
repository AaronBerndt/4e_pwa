import React from "react";
import {
  DefenesesSpace,
  OtherSpaces,
} from "../components/CharacterSheet/Spaces";

export default {
  title: "CharacterSheet/Spaces",
};

export const Main: any = () => (
  <DefenesesSpace
    defeneses={{
      AC: 20,
      Fortitude: 10,
      Reflex: 10,
      Will: 10,
    }}
  />
);

export const Other: any = () => (
  <OtherSpaces speed={6} initiative={10} actionPoints={1} />
);
