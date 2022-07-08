import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Weapons";

const fetchWeapons = (className, level) => axios.get(`/api/weapons`);

export const preFetchWeapons = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchWeapons);

export default function useWeapons() {
  return useQuery<any>([KEY], fetchWeapons, {
    select: ({ data }) => data,
  });
}
