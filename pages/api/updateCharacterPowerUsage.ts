import { orderBy, tail } from "lodash";
import {
  fetchCollection,
  insertIntoCollection,
  updateCollection,
} from "../../utils/mongoUtils";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { _id, action, powerName } = req.body.data;

    const data = await fetchCollection("characters", {
      _id: new ObjectId(_id),
    });

    const [
      {
        characterState: { expendedPowers, ...characterStateRest },
        ...rest
      },
    ] = data;

    const newCharacterState = {
      ...rest,
      characterState: {
        expendedPowers:
          action === "expend"
            ? [...expendedPowers, powerName]
            : expendedPowers.filter((power: string) => power === powerName)
                .length < 1
            ? [
                ...expendedPowers.filter(
                  (power: string) => power !== powerName
                ),
                ...tail(
                  expendedPowers.filter((power: string) => power === powerName)
                ),
              ]
            : expendedPowers.filter((power: string) => power !== powerName),
        ...characterStateRest,
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
