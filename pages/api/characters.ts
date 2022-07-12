import { orderBy } from 'lodash';
import { ObjectId } from 'mongodb';
import {Character} from '../../types';
import { fetchCollection } from '../../utils/mongoUtils';

function calculateModifiers(abilityScore) {
  return Math.floor((abilityScore - 10) / 2);
}

function calculateAttackBonus(
  abilityScore: number,
  characterData: Character,
  keywords: string[]
) {
  const isWeapon = keywords.includes('Weapon');

  const proficiency = isWeapon? 1 : 0
  const enhancement = 0
  const feat = 0
  const classBonus = 0

  return Math.floor((characterData.level) / 2) + abilityScore + proficiency + enhancement + feat + classBonus
}

function calculateDamageRoll(
  abilityScore: number,
  characterData: Character,
  keywords: string[]
) {
  const isWeapon = keywords.includes('Weapon');

  const proficiency = isWeapon? 1 : 0
  const enhancement = 0
  const feat = 0
  const classBonus = 0

  return Math.floor((characterData.level) / 2) + abilityScore + proficiency
}


export default async function handler(req, res) {
  try {
    const _id: any = req.query._id;

    let data = await fetchCollection(
      'characters',
      _id ? { _id: new ObjectId(_id) } : null
    );

    if (_id) {
      const [
        {
          feats,
          powers,
          characterClass,
          trainedSkills,
          abilityScores,
          ...rest
        },
      ] = data;

      let classData = await fetchCollection('classes', {
        name: characterClass,
      });

      console.log(classData);

      let newPowerList = await fetchCollection('powers', {
        $or: powers.map((power) => ({
          name: { $regex: new RegExp('^' + power, 'i') },
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

        const newHtml = html
          .replace(/strength modifier/i, abilityModifiers['strength'])
          .replace(/dexterity modifier/i, abilityModifiers['dexterity'])
          .replace(/constitution modifier/i, abilityModifiers['constitution'])
          .replace(/intelligence modifier/i, abilityModifiers['intelligence'])
          .replace(/wisdom modifier/i, abilityModifiers['wisdom'])
          .replace(/charisma modifier/i, abilityModifiers['charisma'])
          .replace(/Strength/, calculateAttackBonus(abilityModifiers['strength'], data, rest.keywords))
          .replace(/Dexterity/, calculateAttackBonus(abilityModifiers['dexterity'],data,rest.keywords))
          .replace(/Constitution/, calculateAttackBonus(abilityModifiers['constitution'],data,rest.keywords))
          .replace(/Intelligence/, calculateAttackBonus(abilityModifiers['intelligence'],data,rest.keywords))
          .replace(/Wisdom/, calculateAttackBonus(abilityModifiers['wisdom'],data,rest.keywords))
          .replace(/Charisma/, calculateAttackBonus(abilityModifiers['charisma'],data,rest.keywords))

        return { html: newHtml, ...rest };
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
