import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Feats";

const fetchFeats = ({ ancestry, characterClass, featList, powerList }) =>
  axios.get(
    `/api/feats?ancestry=${ancestry}&className=${characterClass}&featList=${featList.join(
      ","
    )}&powerList=${powerList.join(",")}`
  );

export const preFetchFeats = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchFeats);

export default function useFeats(props) {
  return useQuery<any>(
    [KEY, props],

    ![props.ancestry, props.characterClass].includes("")
      ? () => fetchFeats(props)
      : () => Promise.resolve({ data: [] }),
    {
      select: ({ data }) => data,
      initialData: [],
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );
}
