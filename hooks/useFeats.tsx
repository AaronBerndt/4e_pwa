import { QueryClient, useQuery } from "react-query";
import axios from "../node_modules/axios/index";

export const KEY = "Fetch Feats";

const fetchFeats = ({ ancestry, characterClass, featList, powerList, level }) =>
  axios.get(
    `/api/feats?ancestry=${ancestry}&className=${characterClass}&featList=${featList.join(
      ","
    )}&powerList=${powerList.join(",")}&level=${level}`
  );

export default function useFeats(props) {
  return useQuery<any>(
    [KEY],

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
