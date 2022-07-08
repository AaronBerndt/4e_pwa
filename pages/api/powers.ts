import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const { powerList, className, level }: any = req.query;

    const data = await fetchCollection(
      "powers",
      powerList
        ? { $or: powerList.split(",").map((name: any) => ({ name })) }
        : className
        ? { class: className }
        : null
    );

    res
      .status(200)
      .send(
        orderBy(data, ["level"]).filter((power) => Number(power.level) <= level)
      );
  } catch (e) {
    res.status(504).send(e);
  }
}
