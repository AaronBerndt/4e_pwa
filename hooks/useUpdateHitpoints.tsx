import { useMutation, useQueryClient } from 'react-query';
import axios from '../node_modules/axios/index';
import { FETCH_CHARACTER_KEY } from './useCharacters';
type MutateProps = {
  _id: string;
  healthChangeAmount: number;
  type: 'heal' | 'damage' | 'add temporary hitpoints';
};
export default function useUpdateHitPoints() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ healthChangeAmount, type, _id }) =>
      axios.post('/api/updateCharacterHitpoints', {
        data: { healthChangeAmount, _id, type },
      }),
    {
      onMutate: async ({ healthChangeAmount, type, _id }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any =
          queryClient.getQueryData(CHARACTER_QUERY_KEY);

        const {
          characterState: { damage, temporaryHitpoints, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        console.log(rest.hitpoints - damage);
        const newCharacterState = {
          ...rest,
          characterState: {
            damage:
              type !== 'add temporary hitpoints'
                ? type === 'heal'
                  ? damage - healthChangeAmount <= 0
                    ? 0
                    : Math.sign(rest.hitpoints - damage) === (-1 || 0)
                    ? healthChangeAmount
                    : damage - healthChangeAmount
                  : damage +
                    (healthChangeAmount - temporaryHitpoints <= 0
                      ? 0
                      : healthChangeAmount - temporaryHitpoints)
                : damage,
            temporaryHitpoints:
              type === 'add temporary hitpoints'
                ? healthChangeAmount > temporaryHitpoints
                  ? healthChangeAmount
                  : temporaryHitpoints
                : type === 'damage'
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
