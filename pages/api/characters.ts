import { orderBy } from "lodash";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../../utils/mongoUtils";

function calculateModifiers(abilityScore) {
  return Math.floor((abilityScore - 10) / 2);
}

export default async function handler(req, res) {
  try {
    const _id: any = req.query._id;

    let data = await fetchCollection(
      "characters",
      _id ? { _id: new ObjectId(_id) } : null
    );

    if (_id) {
      const [{ feats, powers, trainedSkills, abilityScores, ...rest }] = data;

      let newPowerList = await fetchCollection("powers", {
        $or: powers.map((power) => ({
          name: { $regex: new RegExp(power, "i") },
        })),
      });

      const abilityModifiers = Object.assign(
        {},
        ...Object.entries(abilityScores).map(([NAME, VALUE]) => ({
          [NAME]: calculateModifiers(VALUE),
        }))
      );

      newPowerList = newPowerList.map((power) => {
        const { html, ...rest } = power;

        // const newHtml = html
        //   .replace("Strength modifier", abilityModifiers("strength"))
        //   .replace("Dexterity modifier", abilityModifiers("dexterity"))
        //   .replace("constitution modifier", abilityModifiers("constitution"))
        //   .replace("intelligence modifier", abilityModifiers("intelligence"))
        //   .replace("wisdom modifier", abilityModifiers("wisdom"))
        //   .replace("charisma", abilityModifiers("charisma"))
        //   .replace("Strength", abilityModifiers("strength"))
        //   .replace("Dexterity", abilityModifiers("dexterity"))
        //   .replace("constitution", abilityModifiers("constitution"))
        //   .replace("intelligence", abilityModifiers("intelligence"))
        //   .replace("wisdom", abilityModifiers("wisdom"))
        //   .replace("charisma", abilityModifiers("charisma"));

        return power;
      });

      // let newFeatList = await fetchCollection("feats", {
      //   $or: feats.map((feat) => ({ name: { $regex: new RegExp(feat, "i") } })),
      // });

      console.log(rest);
      data = { ...rest, powers: newPowerList, feats };
      console.log(data);
    }

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
