import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const data = await fetchCollection("items");

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
