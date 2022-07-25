import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import { KEY } from "./useCharacters";
import { useCharacterEditContext } from "../context/CharacterEditContext";

export default function useEditCharacter(_id: any) {
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

  return useMutation(
    () =>
      axios.post(`/api/editCharacter?_id=${_id}`, {
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
