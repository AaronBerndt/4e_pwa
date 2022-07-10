import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const {
      powerList,
      className,
      level,
      epicDestiny,
      ancestry,
      paragonPath,
    }: any = req.query;

    const data = await fetchCollection(
      "powers",
      powerList
        ? { $or: powerList.split(",").map((name: any) => ({ name })) }
        : className && level
        ? {
            $or: [className, epicDestiny, paragonPath, ancestry]
              .filter((value) => value !== "")
              .map((value) => ({ class: value })),
            level: { $lte: level },
          }
        : null
    );

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
