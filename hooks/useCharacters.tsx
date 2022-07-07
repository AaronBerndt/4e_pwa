import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { CHARACTER_URL } from "./api.config";

export const KEY = "Fetch Characters";
export const FETCH_CHARACTER_KEY = "Fetch Character";

const fetchCharacters = () => axios.get(CHARACTER_URL);

export const preFetchCharacters = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchCharacters);

export default function useCharacters() {
  return useQuery<any>(KEY, fetchCharacters, {
    select: ({ data }) => data,
  });
}

export function usePlayerCharacters(playerId: string) {
  return useQuery<any>(
    [KEY, playerId],
    () => axios.get(`${CHARACTER_URL}?playerId=${playerId}`),
    {
      select: ({ data }) => data,
    }
  );
}

export function useCharacter(characterId: any) {
  return useQuery([FETCH_CHARACTER_KEY, characterId], () =>
    axios.get(`${CHARACTER_URL}?_id=${characterId}`)
  );
}
