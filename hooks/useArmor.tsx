import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Armor";

const fetchArmor = () => axios.get(`/api/armor`);

export const preFetchArmor = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchArmor);

export default function useArmor() {
  return useQuery<any>([KEY], fetchArmor, {
    select: ({ data }) => data,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
