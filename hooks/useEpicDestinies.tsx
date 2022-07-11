import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Epic Destinies";

const fetchEpicDestinies = ({ ancestry, className, powerList, featList }) =>
  axios.get(
    `/api/epicDestinies?ancestry=${ancestry}&className=${className}&featList=${powerList}&featList=${featList}`
  );

export const preFetchEpicDestinies = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchEpicDestinies);

export default function useEpicDestinies(props) {
  return useQuery<any>([KEY, props], () => fetchEpicDestinies(props), {
    select: ({ data }) => data,
  });
}
