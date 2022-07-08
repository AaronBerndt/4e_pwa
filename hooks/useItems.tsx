import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Items";

const fetchItems = (className, level) => axios.get(`/api/items`);

export const preFetchItems = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchItems);

export default function useItems() {
  return useQuery<any>([KEY], fetchItems, {
    select: ({ data }) => data,
  });
}
