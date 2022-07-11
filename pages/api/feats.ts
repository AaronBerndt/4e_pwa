import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    let { ancestry, className, featList, powerList, level }: any = req.query;

    const [{ powerSource, role }] = await fetchCollection("classes", {
      name: new RegExp(className),
    });

    const [{ origin }] = await fetchCollection("ancestries", {
      name: ancestry,
    });

    let data = await fetchCollection("feats", {
      $or: [
        { prerequisite: "" },
        { prerequisite: { $regex: new RegExp(ancestry, "i") } },
        { prerequisite: { $regex: new RegExp(className, "i") } },
        { prerequisite: { $regex: new RegExp(powerSource, "i") } },
        { prerequisite: { $regex: new RegExp(role, "i") } },
        {
          prerequisite: {
            $regex: new RegExp(origin + "origin", "i"),
          },
        },

        ...powerList
          .split(",")
          .filter((feat) => feat !== "")
          .map((power) => ({
            prerequisite: {
              $regex: new RegExp(power, "i"),
            },
          })),
        ...featList
          .split(",")
          .filter((feat) => feat !== "")
          .map((feat) => ({
            prerequisite: {
              $regex: new RegExp(feat, "i"),
            },
          })),
      ],
    });

    data = level < 11 ? data.filter(({ tier }) => tier !== "Paragon") : data;
    data = level < 21 ? data.filter(({ tier }) => tier !== "Epic") : data;

    res.status(200).send(orderBy(data));
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
