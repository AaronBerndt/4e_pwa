import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Paragon Paths";

const fetchParagonPaths = (className, level) => axios.get(`/api/paragonPaths`);

export const preFetchParagonPaths = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchParagonPaths);

export default function useParagonPaths() {
  return useQuery<any>([KEY], fetchParagonPaths, {
    select: ({ data }) => data,
  });
}
