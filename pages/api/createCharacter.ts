import { orderBy } from "lodash";
import { fetchCollection, insertIntoCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const { documents } = req.body.data;

    const characterToAdd = {
      ...documents,
      characterState: {
        actionPoints: 1,
        secondWind: 1,
        deathSaves: 0,
        damage: 0,
        expendedSurges: 0,
        expendedPowers: [],
        effects: [],
      },
    };

    const result = await insertIntoCollection("characters", characterToAdd);

    console.log(result);

    res.status(200).send(result);
  } catch (e) {
    res.status(504).send(e);
  }
}
