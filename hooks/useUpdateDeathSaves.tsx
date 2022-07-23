import { useMutation, useQueryClient } from "react-query";
import axios from "../node_modules/axios/index";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
type MutateProps = {
  _id: string;
};
export default function useUpdateHitPoints() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ _id }) =>
      axios.post("/api/updateCharacterDeathSaves", {
        data: { _id },
      }),
    {
      onMutate: async ({ _id }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any =
          queryClient.getQueryData(CHARACTER_QUERY_KEY);
        console.log(previousCharacterState);

        const {
          characterState: { deathSaves, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          characterState: {
            deathSaves: deathSaves === 3 ? 3 : deathSaves + 1,
            ...characterStateRest,
          },
        };

        queryClient.setQueryData(CHARACTER_QUERY_KEY, {
          data: newCharacterState,
        });

        return {
          CHARACTER_QUERY_KEY,
          previousCharacterState,
          newCharacterState,
        };
      },

      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(context?.CHARACTER_QUERY_KEY);
      },
    }
  );
}
