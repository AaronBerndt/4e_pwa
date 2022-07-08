import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const powerList: any = req.query.powerList;

    console.log(powerList);
    const data = await fetchCollection(
      "powers",
      powerList
        ? { $or: powerList.split(",").map((name: any) => ({ name })) }
        : null
    );

    res.status(200).send(orderBy(data, ["name"]));
  } catch (e) {
    res.status(504).send(e);
  }
}
