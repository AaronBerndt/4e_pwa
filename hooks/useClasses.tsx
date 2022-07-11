import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { CHARACTER_URL, CLASSES_URL, POWERS_URL } from "./api.config";

export const KEY = "Fetch Classes";

const fetchClasses = (className, level) => axios.get(`/api/classes`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchClasses);

export default function useClasses(className?: string, level?: string) {
  return useQuery<any>([KEY], fetchClasses, {
    select: ({ data }) => data,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
