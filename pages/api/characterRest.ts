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
    const { _id, type, surgesToSpend } = req.body.data;

    const data = axios(`/api/characters?_id=${_id}`);
    const { characterState, ...rest } = data;

    const newCharacterState = {
      ...rest,
      characterState: {
        damage:
          type === "full"
            ? 0
            : characterState.damage - rest.surgeValue * surgesToSpend <= 0
            ? 0
            : characterState.damage - rest.surgeValue * surgesToSpend,
        temporaryHitpoints: 0,
        deathSaves: type == "full" ? 0 : characterState.deathSaves,
        actionPoints: type === "full" ? 1 : characterState.actionPoints,
        secondWind: 1,
        expendedSurges:
          type === "full" ? 0 : characterState.expendedSurges + surgesToSpend,
        expendedPowers:
          type === "full"
            ? []
            : characterState.expendedPowers.filter(
                (power) => power.type !== "encounter"
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
