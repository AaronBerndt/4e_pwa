import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Powers";

const fetchPowers = ({
  level,
  characterClass,
  paragonPath,
  epicDestiny,
  ancestry,
}) => axios.get(`/api/powers?className=${characterClass}&level=${level}`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchPowers);

export default function usePowers({
  level,
  characterClass,
  paragonPath,
  epicDestiny,
  ancestry,
}) {
  return useQuery<any>(
    [KEY, characterClass, paragonPath, epicDestiny, ancestry],
    () =>
      fetchPowers({
        level,
        characterClass,
        paragonPath,
        epicDestiny,
        ancestry,
      }),
    {
      select: ({ data }) => data,
      enabled: false,
    }
  );
}
