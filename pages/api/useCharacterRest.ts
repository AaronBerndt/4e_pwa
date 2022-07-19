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
    const [
      {
        characterState: { damage, temporaryHitpoints, ...characterStateRest },
        ...rest
      },
    ] = data;

    const newCharacterState = {
      ...rest,
      characterState: {
        damage:
          type !== "add temporary hitpoints"
            ? type === "heal"
              ? Math.sign(hitpoints - damage) === -1
                ? Math.sign(hitpoints - healthChangeAmount)
                  ? 0
                  : hitpoints - healthChangeAmount
                : damage - healthChangeAmount <= 0
                ? 0
                : damage - healthChangeAmount
              : damage +
                (healthChangeAmount - temporaryHitpoints <= 0
                  ? 0
                  : healthChangeAmount - temporaryHitpoints)
            : damage,
        temporaryHitpoints:
          type === "add temporary hitpoints"
            ? healthChangeAmount > temporaryHitpoints
              ? healthChangeAmount
              : temporaryHitpoints
            : type === "damage"
            ? temporaryHitpoints - healthChangeAmount <= 0
              ? 0
              : temporaryHitpoints - healthChangeAmount
            : temporaryHitpoints,
        ...characterStateRest,
      },
    };

    console.log({
      damage:
        type !== "add temporary hitpoints"
          ? type === "heal"
            ? damage - healthChangeAmount <= 0
              ? 0
              : Math.sign(rest.hitpoints - damage) === -1
              ? healthChangeAmount
              : damage - healthChangeAmount
            : damage +
              (healthChangeAmount - temporaryHitpoints <= 0
                ? 0
                : healthChangeAmount - temporaryHitpoints)
          : damage,
      temporaryHitpoints:
        type === "add temporary hitpoints"
          ? healthChangeAmount > temporaryHitpoints
            ? healthChangeAmount
            : temporaryHitpoints
          : type === "damage"
          ? temporaryHitpoints - healthChangeAmount <= 0
            ? 0
            : temporaryHitpoints - healthChangeAmount
          : temporaryHitpoints,
      ...characterStateRest,
    });

    const result = await updateCollection("characters", newCharacterState, {
      _id: new ObjectId(_id),
    });

    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
