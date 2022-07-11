import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const _id: any = req.query._id;

    let data = await fetchCollection("characters", _id ? { _id } : null);

    if (_id) {
      data = {};
    }

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
