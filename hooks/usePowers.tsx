import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { CHARACTER_URL, POWERS_URL } from "./api.config";

export const KEY = "Fetch Powers";

const fetchPowers = () => axios.get(POWERS_URL);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchPowers);

export default function usePowers() {
  return useQuery<any>(KEY, fetchPowers, {
    select: ({ data }) => data,
  });
}
