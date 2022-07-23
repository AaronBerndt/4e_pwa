import { tail } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import axios from "../node_modules/axios/index";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
type MutateProps = {
  _id: string;
  powerName: string;
  action: "expend" | "regain";
};

export default function useUpdatePowerUsage() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ powerName, action, _id }) =>
      axios.post("/api/updateCharacterPowerUsage", {
        data: { powerName, action, _id },
      }),
    {
      onMutate: async ({ powerName, action, _id }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any =
          queryClient.getQueryData(CHARACTER_QUERY_KEY);

        const {
          characterState: { expendedPowers, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          characterState: {
            expendedPowers:
              action === "expend"
                ? [...expendedPowers, powerName]
                : expendedPowers.filter((power: string) => power === powerName)
                    .length < 1
                ? [
                    ...expendedPowers.filter(
                      (power: string) => power !== powerName
                    ),
                    ...tail(
                      expendedPowers.filter(
                        (power: string) => power === powerName
                      )
                    ),
                  ]
                : expendedPowers.filter((power: string) => power !== powerName),
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
