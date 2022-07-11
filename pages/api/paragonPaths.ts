import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  const { name, ancestry, className } = req.query;
  try {
    const [{ powerSource }] = await fetchCollection("classes", {
      name: new RegExp(className),
    });

    const [{ origin }] = await fetchCollection("classes", {
      name: ancestry,
    });

    const data = await fetchCollection(
      "paragonPaths",
      name
        ? {
            name,
          }
        : ancestry && className
        ? {
            $or: [
              { prerequisite: "" },
              { prerequisite: { $regex: new RegExp(ancestry, "i") } },
              { prerequisite: { $regex: new RegExp(ancestry, "i") } },
              { prerequisite: { $regex: new RegExp(ancestry, "i") } },
              { prerequisite: { $regex: new RegExp(className, "i") } },
              { prerequisite: { $regex: new RegExp(powerSource, "i") } },
              {
                prerequisite: {
                  $regex: new RegExp(powerSource + "origin", "i"),
                },
              },
            ],
          }
        : null
    );

    res.status(200).send(orderBy(data));
  } catch (e) {
    res.status(504).send(e);
  }
}
