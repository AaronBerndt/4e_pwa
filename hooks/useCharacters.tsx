import { QueryClient, useQuery } from "react-query";
import axios from "axios";

export const KEY = "Fetch Characters";
export const FETCH_CHARACTER_KEY = "Fetch Character";

const fetchCharacters = () => axios.get("/api/characters");

export const preFetchCharacters = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchCharacters);

export default function useCharacters() {
  return useQuery<any>(KEY, fetchCharacters, {
    select: ({ data }) => data,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });
}

export function usePlayerCharacters(playerId: string) {
  return useQuery<any>(
    [KEY, playerId],
    () => axios.get(`/api/characters?playerId=${playerId}`),
    {
      select: ({ data }) => data,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );
}

export function useCharacter(characterId: any) {
  return useQuery(
    [FETCH_CHARACTER_KEY, characterId],
    () => axios.get(`/api/characters?_id=${characterId}`),
    {
      select: ({ data }) => data,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );
}

export function useCharacterForEdit(characterId: any) {
  return useQuery(
    [FETCH_CHARACTER_KEY, characterId],
    () => axios.get(`/api/characters?_id=${characterId}&type=edit`),
    {
      select: ({ data }) => data[0],
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );
}
