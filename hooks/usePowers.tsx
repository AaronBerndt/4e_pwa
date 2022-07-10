import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { CHARACTER_URL, POWERS_URL } from "./api.config";

export const KEY = "Fetch Powers";

const fetchPowers = (className, level) =>
  axios.get(`/api/powers/?className=${className}&level=${level}`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchPowers);

export default function usePowers(className?: string, level?: string) {
  return useQuery<any>(
    [KEY, className, level],
    () => fetchPowers(className, level),
    {
      select: ({ data }) => data,
    }
  );
}
