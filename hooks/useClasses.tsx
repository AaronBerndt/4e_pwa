import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";
import { CHARACTER_URL, CLASSES_URL, POWERS_URL } from "./api.config";

export const KEY = "Fetch Classes";

const fetchClasses = (className, level) => axios.get(`${CLASSES_URL}`);

export const preFetchPowers = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchClasses);

export default function usePowers(className?: string, level?: string) {
  return useQuery<any>([KEY], fetchClasses, {
    select: ({ data }) => data,
  });
}
