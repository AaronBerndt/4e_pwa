import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { CHARACTER_URL, POWERS_URL } from "./api.config";

export const KEY = "Fetch Powers";

const fetchPowers = (className, level) =>
  axios.get(`${POWERS_URL}?className=${className}&level=${level}`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchPowers);

export default function usePowers(className?: string, level?: string) {
  return useQuery<any>(
    [KEY],
    () => axios.get(`${POWERS_URL}?className=${className}&level=${level}`),
    {
      select: ({ data }) => data,
    }
  );
}
