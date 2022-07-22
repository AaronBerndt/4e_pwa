import { orderBy } from "lodash";
import axios from "axios";
import {
  fetchCollection,
  insertIntoCollection,
  updateCollection,
} from "../../utils/mongoUtils";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { _id, type, surgesToSpend, surgeValue } = req.body.data;

    const data = await fetchCollection(
      "characters",
      _id ? { _id: new ObjectId(_id) } : null
    );

    const [{ characterState, ...rest }] = data;

    const newCharacterState = {
      ...rest,
      characterState: {
        damage:
          type === "full"
            ? 0
            : characterState.damage - surgeValue * surgesToSpend <= 0
            ? 0
            : characterState.damage - surgeValue * surgesToSpend,
        temporaryHitpoints: 0,
        deathSaves: type == "full" ? 0 : characterState.deathSaves,
        actionPoints: type === "full" ? 1 : characterState.actionPoints,
        secondWind: 1,
        expendedSurges:
          type === "full" ? 0 : characterState.expendedSurges + surgesToSpend,
        expendedPowers:
          type === "full"
            ? []
            : characterState.expendedPowers.filter((power) =>
                /encounter/i.test(power.type)
              ),
        effects: [],
      },
    };

    const result = await updateCollection("characters", newCharacterState, {
      _id: new ObjectId(_id),
    });

    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
