import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useCharacterBuilderContext } from "../context/CharacterBuildContext";
import { KEY } from "./useCharacters";

export default function useDeleteCharacter() {
  const queryClient = useQueryClient();

  const characterData = {};
  return useMutation(
    (_id) => axios.delete(`/api/deleteCharacter?_id=${_id}`),

    {
      onMutate: async (_id) => {
        console.log(_id);
        await queryClient.cancelQueries();
        const previousCharactersState: any = queryClient.getQueryData(KEY);

        queryClient.setQueryData(KEY, {
          data: previousCharactersState.data.filter(
            ({ _id: characterId }) => characterId !== _id
          ),
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
