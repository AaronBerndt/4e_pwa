import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { Filter } from "../types";

export const KEY = "Fetch Ancestries";

const fetchAncestries = () => axios.get(`/api/ancestries`);

export default function useAncestries(filter?: Filter) {
  return useQuery<any>([KEY], fetchAncestries, {
    select: ({ data }) => data,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
