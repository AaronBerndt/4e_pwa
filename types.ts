export type Card = {
  _id: string;
  id: string;
  name: string;
  class: string;
  level: string;
  type: string;
  action: string;
  keywords: string;
  sourceBook: string;
  html: string;
};

export type Cards = Card[];

export type Character = {
  _id: string;
  name: string;
  ancestry: string;
  class: string;
  paragonPath: string;
  epicDestiny: string;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    speed: number;
    initiative: number;
  };
  defeneses: {
    armorClass: number;
    fortitude: number;
    reflex: number;
    will: number;
  };
  feats: string[];
  powers: string[];
  inventory: Item[];
  skills: string[];
  gear: {
    weapons: string[];
    armor: string;
    arms: string;
    feet: string;
    hands: string;
    head: string;
    neck: string;
    rings: string[];
    waist: string;
  };
  characterState: [
    actionPoints: number,
    secondWind: number,
    deathSaves: number,
    damage: number,
    surges: number,
    expended: string[],
    effects: string[]
  ];
};

export type Item = {
  _id: string;
  amount: number;
};

export type Filter = {
  name: string;
  value: string;
};
