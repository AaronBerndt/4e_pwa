import { orderBy, max } from "lodash";
import { ObjectId } from "mongodb";
import { Character } from "../../types";
import { fetchCollection } from "../../utils/mongoUtils";

function calculateModifiers(abilityScore) {
  return Math.floor((abilityScore - 10) / 2);
}

function calculateAttackBonus(
  abilityScore: number,
  characterData: Character,
  keywords: string[]
) {
  const isWeapon = keywords.includes("Weapon");

  const proficiency = isWeapon ? 1 : 0;
  const enhancement = 0;
  const feat = 0;
  const classBonus = 0;

  return (
    Math.floor(characterData.level / 2) +
    abilityScore +
    proficiency +
    enhancement +
    feat +
    classBonus
  );
}

function calculateWeaponDamage(characterData) {}

async function calculateDefenses(characterData, classData, abilityModifiers) {
  const { gear, level } = characterData;
  const characterLevel = Math.floor(level / 2);

  const armor =
    gear.armor !== ""
      ? await fetchCollection("armor", {
          name: characterData.gear.armor.name,
        })
      : [{ acBonus: 0, name: "", enhancement: 0 }];

  const shield =
    gear.shield !== ""
      ? await fetchCollection("armor", {
          name: gear.shield.name,
        })
      : [{ acBonus: 0, name: "", enhancement: 0 }];

  const defenseBonus = Object.assign(
    {},
    ...classData.bonusToDefense.split(",").map((bonus) => {
      const regex = /(.) (.*)/;
      const result = regex.exec(bonus.trim());

      return { [result[2].toLowerCase()]: Number(result[1]) };
    })
  );

  const acModifier = max([
    abilityModifiers.strength,
    abilityModifiers.constitution,
  ]);

  const fortitudeModifter = max([
    abilityModifiers.strength,
    abilityModifiers.constitution,
  ]);
  const reflexModifter = max([
    abilityModifiers.dexterity,
    abilityModifiers.intelligence,
  ]);

  const willModifter = max([
    abilityModifiers.wisdom,
    abilityModifiers.charisma,
  ]);

  const classFortitudeBonus = defenseBonus["fortitude"]
    ? defenseBonus["fortitude"]
    : 0;

  const classReflexBonus = defenseBonus["reflex"] ? defenseBonus["reflex"] : 0;

  const classWillBonus = defenseBonus["will"] ? defenseBonus["will"] : 0;

  return {
    AC:
      10 +
      characterLevel +
      acModifier +
      armor[0].acBonus +
      shield[0].acBonus +
      (gear.armor ? gear.armor.enhancement : armor[0].enhancement) +
      (gear.shield ? gear.shield.enhancement : shield[0].enhancement),
    Fortitude: 10 + characterLevel + fortitudeModifter + classFortitudeBonus,
    Reflex: 10 + characterLevel + reflexModifter + classReflexBonus,
    Will: 10 + characterLevel + willModifter + classWillBonus,
  };
}

function calculateHitpoints(characterData: Character, classData) {
  const regex = /(.*)\+ Constitution/;
  const result = regex.exec(classData.hitpointsAtFirstLevel);

  const firstLevelHitpoints =
    Number(result[1]) + characterData.abilityScores.constitution;

  const otherLevelsHitpoints =
    (characterData.level - 1) * Number(classData.hitpointsPerLevel);

  return firstLevelHitpoints + otherLevelsHitpoints;
}

function calculateHealSurges(constitutionModifer, classData) {
  const regex = /(.*)\+ Constitution Modifier/;
  const result = regex.exec(classData.healingSurgesPerDay);

  return constitutionModifer + Number(result[1]);
}

function calculateHealSurgeValue(maxHealth) {
  return Math.floor(maxHealth / 4);
}

function calculateDamageRoll(
  abilityScore: number,
  characterData: Character,
  keywords: string[]
) {
  const isWeapon = keywords.includes("Weapon");

  const proficiency = isWeapon ? 1 : 0;
  const enhancement = 0;
  const feat = 0;
  const classBonus = 0;

  return Math.floor(characterData.level / 2) + abilityScore + proficiency;
}

export default async function handler(req, res) {
  try {
    const _id: any = req.query._id;
    let finalData = null;

    const data = await fetchCollection(
      "characters",
      _id ? { _id: new ObjectId(_id) } : null
    );

    if (_id) {
      const characterData = data[0];

      const {
        ancestry,
        feats,
        powers,
        characterClass,
        trainedSkills,
        abilityScores,
        ...rest
      } = characterData;

      let classData = await fetchCollection("classes", {
        name: characterClass,
      });

      let newPowerList = await fetchCollection("powers", {
        $or: [
          ...powers.map((power) => ({
            name: { $regex: new RegExp("^" + power, "i") },
          })),
          {
            class: new RegExp("^" + ancestry, "i"),
            level: characterData.level,
          },
        ],
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
          .replace(/strength modifier/i, abilityModifiers["strength"])
          .replace(/dexterity modifier/i, abilityModifiers["dexterity"])
          .replace(/constitution modifier/i, abilityModifiers["constitution"])
          .replace(/intelligence modifier/i, abilityModifiers["intelligence"])
          .replace(/wisdom modifier/i, abilityModifiers["wisdom"])
          .replace(/charisma modifier/i, abilityModifiers["charisma"])
          .replace(
            /Strength/,
            calculateAttackBonus(
              abilityModifiers["strength"],
              data,
              rest.keywords
            )
          )
          .replace(
            /Dexterity/,
            calculateAttackBonus(
              abilityModifiers["dexterity"],
              data,
              rest.keywords
            )
          )
          .replace(
            /Constitution/,
            calculateAttackBonus(
              abilityModifiers["constitution"],
              data,
              rest.keywords
            )
          )
          .replace(
            /Intelligence/,
            calculateAttackBonus(
              abilityModifiers["intelligence"],
              data,
              rest.keywords
            )
          )
          .replace(
            /Wisdom/,
            calculateAttackBonus(
              abilityModifiers["wisdom"],
              data,
              rest.keywords
            )
          )
          .replace(
            /Charisma/,
            calculateAttackBonus(
              abilityModifiers["charisma"],
              data,
              rest.keywords
            )
          );

        return { html: newHtml, ...rest };
      });

      // let newFeatList = await fetchCollection("feats", {
      //   $or: feats.map((feat) => ({ name: { $regex: new RegExp(feat, "i") } })),
      // });

      const hitpoints = calculateHitpoints(characterData, classData[0]);
      finalData = {
        ...rest,
        hitpoints,
        surgesPerDay: calculateHealSurges(
          abilityModifiers.constitution,
          classData[0]
        ),
        defeneses: await calculateDefenses(
          characterData,
          classData[0],
          abilityModifiers
        ),
        surgeValue: calculateHealSurgeValue(hitpoints),
        powers: newPowerList,
        feats,
      };
    }

    res.status(200).send(_id ? finalData : data);
  } catch (e) {
    console.log(e);
    res.status(504).send(e);
  }
}
