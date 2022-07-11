import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Paragon Paths";

const fetchParagonPaths = ({ ancestry, className }) =>
  axios.get(`/api/paragonPaths?ancestry=${ancestry}&className=${className}`);

export const preFetchParagonPaths = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchParagonPaths);

export default function useParagonPaths(props) {
  return useQuery<any>([KEY, props], () => fetchParagonPaths(props), {
    select: ({ data }) => data,
  });
}
