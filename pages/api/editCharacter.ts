import { orderBy } from "lodash";
import { ObjectId } from "mongodb";
import { updateCollection } from "../../utils/mongoUtils";

export default async function handler(req, res) {
  try {
    const _id = req.query._id;
    const { documents } = req.body.data;
    console.log(documents);
    const result = await updateCollection(
      "characters",
      { _id, ...documents },
      {
        _id: new ObjectId(_id),
      }
    );

    res.status(200).send(result);
  } catch (e) {
    res.status(504).send(e);
  }
}
