import React from "react";
import { HealthWorkspaceModal } from "../components/CharacterSheet/HealthWorkModal";
export default {
  title: "CharacterSheet/HealthWorkspaceModal",
  component: HealthWorkspaceModal,
};

const characterState = (overides?) => ({
  actionPoints: 1,
  secondWind: 1,
  deathSaves: 0,
  temporaryHitpoints: 0,
  damage: 0,
  surges: 10,
  expended: [],
  effects: [],
  ...overides,
});

export const Main: any = () => (
  <HealthWorkspaceModal
    _id={"123456"}
    hitpoints={10}
    characterState={characterState()}
  />
);

export const Damage: any = () => (
  <HealthWorkspaceModal
    _id={"12345"}
    hitpoints={10}
    characterState={characterState({
      damage: 1,
    })}
  />
);

export const Bloodied: any = () => (
  <HealthWorkspaceModal
    _id={"12345"}
    hitpoints={10}
    characterState={characterState({
      damage: 5,
    })}
  />
);

export const TemporaryHitpoints: any = () => (
  <HealthWorkspaceModal
    _id={"12345"}
    hitpoints={10}
    characterState={characterState({
      temporaryHitpoints: 10,
    })}
  />
);

export const DeathSaves: any = () => (
  <HealthWorkspaceModal
    _id={"12345"}
    hitpoints={10}
    characterState={characterState({
      damage: 10,
      deathSaves: 2,
    })}
  />
);
