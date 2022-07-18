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
  <HealthWorkspaceModal hitpoints={10} characterState={characterState()} />
);

export const Damage: any = () => (
  <HealthWorkspaceModal
    hitpoints={10}
    characterState={characterState({
      damage: 1,
    })}
  />
);

export const Bloodied: any = () => (
  <HealthWorkspaceModal
    hitpoints={10}
    characterState={characterState({
      damage: 5,
    })}
  />
);

export const TemporaryHitpoints: any = () => (
  <HealthWorkspaceModal
    hitpoints={10}
    characterState={characterState({
      temporaryHitpoints: 10,
    })}
  />
);
