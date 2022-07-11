import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const { ancestry, className, featList, powerList }: any = req.query;

    const [{ powerSource }] = await fetchCollection("classes", {
      name: new RegExp(className),
    });

    const [{ origin }] = await fetchCollection("ancestries", {
      name: ancestry,
    });

    const data = await fetchCollection("feats", {
      $or: [
        { prerequisite: "" },
        { prerequisite: { $regex: new RegExp(ancestry, "i") } },
        { prerequisite: { $regex: new RegExp(className, "i") } },
        { prerequisite: { $regex: new RegExp(powerSource, "i") } },
        {
          prerequisite: {
            $regex: new RegExp(origin + "origin", "i"),
          },
        },

        ...powerList.split(",").map((power) => ({
          prerequisite: {
            $regex: new RegExp(power),
          },
        })),
        ...featList.split(",").map((feat) => ({
          prerequisite: {
            $regex: new RegExp(feat),
          },
        })),
      ],
    });

    res.status(200).send(orderBy(data));
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
