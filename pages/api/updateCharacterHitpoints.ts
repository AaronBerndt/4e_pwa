import { orderBy } from 'lodash';
import {
  fetchCollection,
  insertIntoCollection,
  updateCollection,
} from '../../utils/mongoUtils';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const { _id, type, healthChangeAmount } = req.body.data;

    const data = await fetchCollection('characters', {
      _id: new ObjectId(_id),
    });

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
          type !== 'add temporary hitpoints'
            ? type === 'heal'
              ? damage - healthChangeAmount <= 0
                ? 0
                : Math.sign(rest.hitpoints - damage) === (-1 || 0)
                ? healthChangeAmount
                : damage - healthChangeAmount
              : damage +
                (healthChangeAmount - temporaryHitpoints <= 0
                  ? 0
                  : healthChangeAmount - temporaryHitpoints)
            : damage,
        temporaryHitpoints:
          type === 'add temporary hitpoints'
            ? healthChangeAmount > temporaryHitpoints
              ? healthChangeAmount
              : temporaryHitpoints
            : type === 'damage'
            ? temporaryHitpoints - healthChangeAmount <= 0
              ? 0
              : temporaryHitpoints - healthChangeAmount
            : temporaryHitpoints,
        ...characterStateRest,
      },
    };

    const result = await updateCollection('characters', newCharacterState, {
      _id: new ObjectId(_id),
    });

    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
