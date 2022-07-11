import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  const { name } = req.query;
  try {
    const data = await fetchCollection("classes", name ? { name } : null);

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
