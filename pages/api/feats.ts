import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const { tier, featList }: any = req.query;

    const data = await fetchCollection(
      "feats",
      featList
        ? { $or: featList.split(",").map((name: any) => ({ name })) }
        : tier
        ? { tier }
        : null
    );

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
