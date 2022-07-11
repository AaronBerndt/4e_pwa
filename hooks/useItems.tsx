import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Items";

const fetchItems = ({ category }) =>
  axios.get(`/api/items?category=${category}`);

export default function useItems(props) {
  return useQuery<any>([KEY, props], () => fetchItems(props), {
    select: ({ data }) => data,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
