import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Epic Destinies";

const fetchEpicDestinies = (className, level) =>
  axios.get(`/api/epicDestinies`);

export const preFetchEpicDestinies = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchEpicDestinies);

export default function useEpicDestinies() {
  return useQuery<any>([KEY], fetchEpicDestinies, {
    select: ({ data }) => data,
  });
}
