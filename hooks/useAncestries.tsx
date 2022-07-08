import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { CHARACTER_URL, CLASSES_URL, POWERS_URL } from "./api.config";

export const KEY = "Fetch Ancestries";

const fetchAncestries = (className, level) => axios.get(`/api/ancestries`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchAncestries);

export default function useAncestries() {
  return useQuery<any>([KEY], fetchAncestries, {
    select: ({ data }) => data,
  });
}
