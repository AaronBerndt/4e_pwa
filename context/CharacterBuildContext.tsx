import { createContext, useContext, useState } from "react";

const defaultAbilityScores = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
  speed: 8,
  initiative: 0,
};

const defaultGear = {
  weapons: [],
  armor: "",
  implement: "",
  shield: "",
  arms: "",
  feet: "",
  hands: "",
  head: "",
  neck: "",
  rings: [],
  waist: "",
};

const defaultCurrency = {
  copper: 0,
  silver: 0,
  gold: 0,
  platinum: 0,
};

const CharacterBuilderContext = createContext<any>({
  name: "",
  level: 1,
  setName: Function,
  setLevel: Function,
  ancestry: "",
  setAncestry: Function,
  abilityScores: defaultAbilityScores,
  setAbilityScores: Function,
  characterClass: "",
  setClass: Function,
  paragonPath: "",
  setParagonPath: Function,
  epicDestiny: "",
  setEpicDestiny: Function,
  powers: [],
  setPowers: Function,
  feats: [],
  setFeats: Function,
  trainedSkills: [],
  setTrainedSkills: Function,
  gear: defaultGear,
  inventory: [],
  setInventory: Function,
  currency: defaultCurrency,
});

export function CharacterBuilderProvider({ children, characterData }: any) {
  const [name, setName] = useState(
    characterData?.name ? characterData.name : ""
  );
  const [level, setLevel] = useState(
    characterData?.level ? characterData.level : 1
  );
  const [ancestry, setAncestry] = useState(
    characterData?.ancestry ? characterData.ancestry : ""
  );
  const [abilityScores, setAbilityScores] = useState(
    characterData?.abilityScores
      ? characterData.abilityScores
      : defaultAbilityScores
  );
  const [characterClass, setCharacterClass] = useState(
    characterData?.characterClass ? characterData.characterClass : ""
  );
  const [paragonPath, setParagonPath] = useState(
    characterData?.paragonPath ? characterData.paragonPath : ""
  );
  const [epicDestiny, setEpicDestiny] = useState(
    characterData?.epicDestiny ? characterData.epicDestiny : ""
  );

  const [powers, setPowers] = useState(
    characterData?.powers ? characterData.powers : []
  );
  const [feats, setFeats] = useState(
    characterData?.feats ? characterData.feats : []
  );
  const [trainedSkills, setTrainedSkills] = useState(
    characterData?.trainedSkills ? characterData.trainedSkills : []
  );
  const [gear, setGear] = useState(
    characterData?.gear ? characterData.gear : defaultGear
  );
  const [inventory, setInventory] = useState(
    characterData?.inventory ? characterData.inventory : []
  );

  return (
    <CharacterBuilderContext.Provider
      value={{
        name,
        level,
        setName,
        setLevel,
        ancestry,
        setAncestry,
        abilityScores,
        setAbilityScores,
        characterClass,
        setCharacterClass,
        paragonPath,
        setParagonPath,
        epicDestiny,
        setEpicDestiny,
        powers,
        setPowers,
        feats,
        setFeats,
        trainedSkills,
        setTrainedSkills,
        gear,
        setGear,
        inventory,
        setInventory,
      }}
    >
      {children}
    </CharacterBuilderContext.Provider>
  );
}

export function useCharacterBuilderContext() {
  return useContext(CharacterBuilderContext);
}
