import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Classes";

const fetchClasses = () => axios.get(`/api/classes`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchClasses);

export default function useClasses(className?: string, level?: string) {
  return useQuery<any>([KEY], fetchClasses, {
    select: ({ data }) => data,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
