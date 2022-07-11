import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Feats";

const fetchFeats = ({ ancestry, className }) =>
  axios.get(`/api/feats?ancestry=${ancestry}&className=${className}`);

export const preFetchFeats = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchFeats);

export default function useFeats(props) {
  return useQuery<any>([KEY, props], () => fetchFeats(props), {
    select: ({ data }) => data,
    initialData: [],
  });
}
