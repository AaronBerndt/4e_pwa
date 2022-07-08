import { orderBy } from "lodash";
import { fetchCollection, insertIntoCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const result = await insertIntoCollection("characters", {});

    res.status(200).send(result);
  } catch (e) {
    res.status(504).send(e);
  }
}
