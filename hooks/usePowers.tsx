import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Powers";

const fetchPowers = ({ level, characterClass }) =>
  axios.get(`/api/powers?className=${characterClass}&level=${level}`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchPowers);

export default function usePowers({ level, characterClass }) {
  return useQuery<any>(
    [KEY, characterClass, level],

    level && characterClass
      ? () =>
          fetchPowers({
            level,
            characterClass,
          })
      : () => Promise.resolve({ data: [] }),
    {
      select: ({ data }) => data,
      initialData: [],
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );
}
