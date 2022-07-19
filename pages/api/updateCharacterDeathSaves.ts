import { orderBy } from "lodash";
import {
  fetchCollection,
  insertIntoCollection,
  updateCollection,
} from "../../utils/mongoUtils";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { _id } = req.body.data;

    const data = await fetchCollection("characters", {
      _id: new ObjectId(_id),
    });

    const [
      {
        characterState: { deathSaves, ...characterStateRest },
        ...rest
      },
    ] = data;

    const newCharacterState = {
      ...rest,
      characterState: {
        deathSaves: deathSaves === 3 ? 3 : deathSaves + 1,
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
