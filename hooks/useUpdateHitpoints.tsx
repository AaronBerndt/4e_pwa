import { useMutation, useQueryClient } from "react-query";
import axios from "../node_modules/axios/index";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
type MutateProps = {
  _id: string;
  healthChangeAmount: number;
  type: "heal" | "damage" | "add temporary hitpoints";
  hitpoints: number;
};

export default function useUpdateHitPoints() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ healthChangeAmount, type, _id, hitpoints }) =>
      axios.post("/api/updateCharacterHitpoints", {
        data: { healthChangeAmount, _id, type, hitpoints },
      }),
    {
      onMutate: async ({
        healthChangeAmount,
        type,
        _id,
        hitpoints,
      }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any =
          queryClient.getQueryData(CHARACTER_QUERY_KEY);

        const {
          characterState: { damage, temporaryHitpoints, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        console.log(hitpoints - (hitpoints - healthChangeAmount));
        const newCharacterState = {
          ...rest,
          characterState: {
            damage:
              type !== "add temporary hitpoints"
                ? type === "heal"
                  ? Math.sign(hitpoints - damage) === -1
                    ? Math.sign(hitpoints - healthChangeAmount)
                      ? 0
                      : hitpoints - healthChangeAmount
                    : damage - healthChangeAmount <= 0
                    ? 0
                    : damage - healthChangeAmount
                  : damage +
                    (healthChangeAmount - temporaryHitpoints <= 0
                      ? 0
                      : healthChangeAmount - temporaryHitpoints)
                : damage,
            temporaryHitpoints:
              type === "add temporary hitpoints"
                ? healthChangeAmount > temporaryHitpoints
                  ? healthChangeAmount
                  : temporaryHitpoints
                : type === "damage"
                ? temporaryHitpoints - healthChangeAmount <= 0
                  ? 0
                  : temporaryHitpoints - healthChangeAmount
                : temporaryHitpoints,
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
