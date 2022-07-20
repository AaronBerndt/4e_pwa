import { useMutation, useQueryClient } from "react-query";
import axios from "../node_modules/axios/index";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
type MutateProps = {
  _id: string;
  type: "full" | "short";
  surgesToSpend?: number;
};
export default function useRest() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ _id, type, surgesToSpend }) =>
      axios.post("/api/characterRest", {
        data: { _id, type, surgesToSpend },
      }),
    {
      onMutate: async ({ _id, type, surgesToSpend }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any =
          queryClient.getQueryData(CHARACTER_QUERY_KEY);

        const { characterState, ...rest } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          characterState: {
            damage:
              type === "full"
                ? 0
                : characterState.damage - rest.surgeValue * surgesToSpend <= 0
                ? 0
                : characterState.damage - rest.surgeValue * surgesToSpend,
            temporaryHitpoints: 0,
            deathSaves: type == "full" ? 0 : characterState.deathSaves,
            actionPoints: type === "full" ? 1 : characterState.actionPoints,
            secondWind: 1,
            expendedSurges:
              type === "full"
                ? 0
                : characterState.expendedSurges + surgesToSpend,
            expendedPowers:
              type === "full"
                ? []
                : characterState.expendedPowers.filter(
                    (power) => power.type !== "encounter"
                  ),
            effects: [],
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
