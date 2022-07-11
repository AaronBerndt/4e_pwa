import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import { KEY } from "./useCharacters";

export default function useCreateChracter() {
  const queryClient = useQueryClient();
  const {
    name,
    level,
    ancestry,
    abilityScores,
    characterClass,
    paragonPath,
    epicDestiny,
    powers,
    feats,
    trainedSkills,
    gear,
    inventory,
    currency,
  } = useCharacterBuilderContext();

  const characterData = {};
  return useMutation(
    () =>
      axios.put("/api/createCharacter", {
        data: {
          documents: {
            name,
            level,
            ancestry,
            abilityScores,
            characterClass,
            paragonPath,
            epicDestiny,
            powers,
            feats,
            trainedSkills,
            gear,
            inventory,
            currency,
          },
        },
      }),
    {
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
