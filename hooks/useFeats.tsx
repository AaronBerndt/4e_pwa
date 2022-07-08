import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Feats";

const fetchFeats = (className, level) => axios.get(`/api/feats`);

export const preFetchFeats = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchFeats);

export default function useFeats() {
  return useQuery<any>([KEY], fetchFeats, {
    select: ({ data }) => data,
  });
}
