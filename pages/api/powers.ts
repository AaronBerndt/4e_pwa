import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    let { powerList, className, level }: any = req.query;

    className = className.includes("Fighter") ? "Fighter" : className;
    const data = await fetchCollection(
      "powers",
      powerList
        ? { $or: powerList.split(",").map((name: any) => ({ name })) }
        : className && level
        ? {
            $or: [className]
              .filter((value) => value !== "")
              .map((value) => ({ class: value })),
            level: { $lte: level },
          }
        : null
    );

    res.status(200).send(data);
  } catch (e) {
    res.status(504).send(e);
  }
}
