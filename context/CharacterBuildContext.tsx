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

export function CharacterBuilderProvider({ children, values }: any) {
  const [name, setName] = useState(values?.name ? values.name : "");
  const [level, setLevel] = useState(values?.level ? values.level : 1);
  const [ancestry, setAncestry] = useState(
    values?.ancestry ? values.ancestry : ""
  );
  const [abilityScores, setAbilityScores] = useState(
    values?.abilityScores ? values.abilityScores : defaultAbilityScores
  );
  const [characterClass, setCharacterClass] = useState(
    values?.class ? values.class : ""
  );
  const [paragonPath, setParagonPath] = useState(
    values?.paragonPath ? values.paragonPath : ""
  );
  const [epicDestiny, setEpicDestiny] = useState(
    values?.epicDestiny ? values.epicDestiny : ""
  );

  const [powers, setPowers] = useState(values?.powers ? values.powers : []);
  const [feats, setFeats] = useState(values?.feats ? values.feats : []);
  const [trainedSkills, setTrainedSkills] = useState(
    values?.trainedSkills ? values.trainedSkills : []
  );
  const [gear, setGear] = useState(values?.name ? values.name : defaultGear);
  const [inventory, setInventory] = useState(values?.name ? values.name : []);

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
