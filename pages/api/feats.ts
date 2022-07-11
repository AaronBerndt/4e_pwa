import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const { ancestry, className, powerSource, featList, Character }: any =
      req.query;

    const data = await fetchCollection(
      "feats",
      featList
        ? { $or: featList.split(",").map((name: any) => ({ name })) }
        : null
    );

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
