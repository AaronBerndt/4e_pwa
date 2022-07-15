import { orderBy } from "lodash";
import { fetchCollection } from "../../utils/mongoUtils";

const classFeatures = {
  Ardent: [
    {
      name: "Ardent Mantle",
      choices: [
        {
          name: "Mantle of Clarity",
          description:
            "You and each ally within 5 squares of you gain a bonus to all defenses against opportunity attacks. The bonus equals your Wisdom modifier. In addition, each ally within 5 squares of you gains a +2 bonus to Insight checks and Perception checks. (If a character is in the radius of more than one Mantle of Clarity, the bonuses are not cumulative. Only the highest ones apply to him or her.) You also gain the ardent alacrity power.",
          powerGained: "Ardent Alacrity",
        },
        {
          name: "Mantle of Elation",
          description:
            "You and each ally within 5 squares of you gain a bonus to damage rolls for opportunity attacks. The bonus equals your Constitution modifier. In addition, each ally within 5 squares of you gains a +2 bonus to Diplomacy checks and Intimidate checks.",
          powerGained: "Ardent Outrage",
        },
        {
          name: "Mantle of Impulsiveness",
          description:
            "When an ally within 5 squares of you is targeted by an opportunity attack, that ally gains a power bonus to damage rolls equal to your Constitution modifier until the end of his or her turn. In addition, each ally within 5 squares of you gains a +2 bonus to Endurance checks and Intimidate checks. Ardent Surge: When you use your ardent surge power, the target also gains a +2 bonus to speed until the end of your next turn.",
          powerGained: "Ardent Eruption",
        },
      ],
    },
    { name: "Ardent Surge", type: "power" },
    { name: "Psionic Augmentation", type: "feature" },
  ],
  Artificer: [
    {
      name: "Arcane Empowerment",
      description:
        "Your study of magic has given you the ability to manipulate the arcane energy contained within items. You begin each day with the ability to empower a magic item, and you gain one additional arcane empowerment for each milestone you reach. You must spend a short rest with an item in order to empower it. You can empower an item in two ways.",
      options: [
        {
          name: "Augment Energy",
          description:
            "You infuse a weapon or an implement with a reservoir of energy that lasts until the end of your next extended rest or until it is expended. The wielder of the implement or the weapon can use a free action after making an attack roll to expend the reservoir of energy to gain a +2 bonus to that attack roll. An implement or a weapon can be augmented only once per day in this way.",
        },
        {
          name: "Impart Energy",
          description:
            "You recharge the daily power of a magic item. An item can be recharged only once per day in this way.",
        },
      ],
    },
    {
      name: "Arcane Rejuvenation",
      description:
        "Before combat, an artificer spends time infusing his or her allies' magic items with curative energy. Whenever one of the artificer's allies uses a magic item's daily power, that ally absorbs the energy and gains temporary hit points equal to one-half your level + your Intelligence modifier.",
    },
    {
      name: "Healing Infusion",
      description:
        "You can create healing infusions for later use. At the end of an extended rest, you create two healing infusions that last until the end of your next extended rest. At 16th level, you instead create three healing infusions. You determine the effect of a healing infusion at the time you use the power, not at the time you create it. When you use a Healing Infusion power, you expend one of the infusions you created during your last extended rest. During a short rest, you or an ally can spend a healing surge to replenish one of the infusions expended.",
      uses: { value: [2, 3], level: [1, 16] },
      options: [
        { name: "Healing Infusion: Curative Admixture", type: "power" },
      ],
      choices: [
        {
          name: "Healing Infusion: Resistive Formula",
          type: "power",
        },
        {
          name: "Healing Infusion: Shielding Elixir",
          type: "power",
        },
      ],
    },
    { name: "Ritual Casting", type: "feat" },
  ],
  Assassin: [
    {
      name: "Assassin'S Shroud",
      type: "power",
    },
    {
      name: "Guild Training",
      choices: [
        {
          name: "Bleak Disciple",
          description:
            "When you hit an unbloodied target, you gain temporary hit points equal to your Constitution modifier. Add 2 to the temporary hit points gained at 11th level and 4 at 21st level.",
        },

        {
          name: "Executioner's Guild",
          description: "You do not gain assassin encounter attack powers.",
          powerGained: "Assassin's Strike",
        },
        {
          name: "Night Stalker",
          description:
            "You gain a bonus to damage rolls equal to your Charisma modifier against any target that is adjacent to none of your enemies.",
        },
      ],
    },
    { name: "Shade Form", type: "power" },
    { name: "Shadow Step", type: "power" },
  ],
  Avenger: [
    {
      name: "Armor of Faith",
      description:
        "The favor of your deity wards you from harm. While you are wearing cloth armor or no armor and aren't using a shield, you gain a +3 bonus to AC.",
      classBonus: { name: "AC", value: 3 },
    },

    {
      name: "Avenger'S Censure",
      choices: [
        {
          name: "Censure of Pursuit",
          description:
            "If your oath of enmity target moves away from you willingly, you gain a bonus to damage rolls against the target equal to 2 + your Dexterity modifier until the end of your next turn. The bonus increases to 4 + your Dexterity modifier at 11th level and 6 + your Dexterity modifier at 21st level.",
        },
        {
          name: "Censure of Retribution",
          description:
            "When any enemy other than your oath of enmity target hits you, you gain a bonus to damage rolls against your oath of enmity target equal to your Intelligence modifier until the end of your next turn. This bonus is cumulative.",
        },
        {
          name: "Censure of Unity",
          description:
            "You gain a +1 bonus to damage rolls against your oath of enmity target for each ally adjacent to that target. The bonus increases to +2 at 11th level and +3 at 21st level.",
        },
      ],
    },
    { name: "Channel Divinity", type: "power" },
    { name: "Oath Of Enmity", type: "power" },
  ],
  Barbarian: [
    {
      name: "Barbarian Agility",
      classBonus: [
        { name: "AC", value: [1, 2, 3], level: [1, 11, 21] },
        { name: "Relex", value: [1, 2, 3], level: [1, 11, 21] },
      ],
    },
    {
      name: "Feral Might",
      choices: [
        {
          name: "Rageblood Vigor",
          description:
            "Whenever your attack reduces an enemy to 0 hit points, you gain temporary hit points equal to your Constitution modifier. The number of temporary hit points equals 5 + your Constitution modifier at 11th level and 10 + your Constitution modifier at 21st level.",
          powerGained: "Swift Charge",
        },
        {
          name: "Thaneborn Triumph",
          description:
            "Whenever you bloody an enemy, the next attack by you or an ally against that enemy gains a bonus to the attack roll equal to your Charisma modifier.",
          powerGained: "Roar of Triumph",
        },
        {
          name: "Thunderborn Wrath",
          description:
            "Once per round when your attack bloodies an enemy, each enemy adjacent to you takes thunder damage equal to your Constitution modifier.",
          powerGained: "War Cry",
        },

        {
          name: "Whirling Slayer",
          description:
            "You can wield a one-handed weapon in your off hand and treat it as an off-hand weapon. In addition, once per round when your attack bloodies an enemy, you can shift 2 squares as a free action, and each enemy adjacent to you at the end of the shift grants combat advantage to you until the end of your next turn.",
          powerGained: "Whirling Lunge",
        },
      ],
    },
    { name: "Rage striek", type: "power" },
    {
      name: "Rampage",
      description:
        "Once per round, when you score a critical hit with a barbarian attack power, you can immediately make a melee basic attack as a free action. You do not have to attack the same target that you scored a critical hit against.",
    },
  ],
  Bard: [
    { name: "Ritual Casting", type: "feat" },

    {
      name: "BARDIC VIRTUE",
      choices: [
        {
          name: "Virtue of Cunning",
          description:
            "Once per round, when an enemy attack misses an ally within a number of squares of you equal to 5 + your Intelligence modifier, you can slide that ally 1 square as a free action.",
        },
        {
          name: "Virtue of Prescience",
          description:
            "Once per encounter as an immediate interrupt, when an enemy hits one ally within 5 squares of you, you grant that ally a power bonus equal to your Wisdom modifier to the defense targeted by the triggering enemy until the end of that enemy's turn.",
        },

        {
          name: "Virtue of Valor",
          description:
            "Once per round, when any ally within 5 squares of you reduces an enemy to 0 hit points or bloodies an enemy, you can grant temporary hit points to that ally as a free action. The number of temporary hit points equals 1 + your Constitution modifier at 1st level, 3 + your Constitution modifier at 11th level, and 5 + your Constitution modifier at 21st level.",
        },
      ],
    },

    { name: "Majestic Word", type: "power" },
    {
      name: "Multiclass Versatility",
      description:
        "You can choose class-specific multiclass feats from more than one class.",
    },
    {
      name: "Skill Versatility",
      classBonus: [{ name: "Untrained Skills", value: 1 }],
    },
    {
      name: "Song of Rest",
      description:
        "When you play an instrument or sing during a short rest, you and each ally who can hear you are affected by your Song of Rest. When an affected character spends healing surges at the end of the rest, that character regains additional hit points equal to your Charisma modifier with each healing surge. A character can be affected by only one Song of Rest at a time",
    },
    {
      name: "Words of Friendship",
      type: "power",
    },
  ],
  Battlemind: [
    { name: "Psionic Augmentation", type: "feature" },
    { name: "Battlemind's Demand", type: "power" },
    { name: "Blurred Step", type: "power" },
    { name: "Mind Ppike", type: "power" },
    {
      name: "Psionic Study",
      choices: [
        {
          name: "Battle Resilience",
          powerGained: "Battle Resilience",
        },
        {
          name: "Persistent Harrier",
          powerGained: "Persistent Harrier",
        },

        {
          name: "Speed of Thought",
          powerGained: "Speed of Thought",
        },
        {
          name: "Will Focus",
          powerGained: "Will Focus",
        },
      ],
    },
  ],
  Cleric: [
    { name: "Channel Divinity", type: "power" },
    {
      name: "Healer's Lore",
      description:
        "When you restore hit points to a creature by using a cleric power that has the healing keyword, add your Wisdom modifier to the hit points regained, but only if the healing involves the creature spending a healing surge.",
      classBonus: {
        name: "Healing",
        value: "Wisdom modifier",
        keywords: "Healing",
      },
    },
    { name: "Healing Word", type: "power" },
  ],
  Druid: [
    {
      name: "Balance of Nature",
      description:
        "Some druids favor being in beast form, while others prefer being in humanoid form. However, just as druids seek balance in the world between divine and primordial forces, druids pursue balance within their own minds and bodies. You begin with three at-will attack powers. Throughout your career, at least one of those powers, and no more than two, must have the beast form keyword. By this means, you have access to useful attacks in either beast form or humanoid form.",
    },
    {
      name: "Primal Aspect",
      choices: [
        {
          name: "Primal Guardian",
          overide: {
            name: "AC",
            value: "Constitution modifier",
          },
        },
        {
          name: "Primal Predator",
          classBonus: {
            name: "Speed",
            value: 1,
          },
        },
        {
          name: "Primal Swarm",
          description:
            "While you are in beast form and not wearing heavy armor, melee attacks and ranged attacks deal less damage to you. When you take damage from either type of attack, the damage is reduced by your Constitution modifier.",
        },
        {
          name: "Primal Wrath",
          classBonus: {
            name: "Attack",
            value: 1,
            keywords: ["cold", "fire", "lightning", "thunder"],
          },
        },
      ],
    },

    { name: "Ritual Casting", type: "feat" },
    { name: "Wild Shape", type: "power" },
  ],
  Fighter: [
    {
      name: "Combat Power",
      choices: [
        {
          name: "Combat Superiority",
          description:
            "You gain a bonus to the attack rolls of opportunity attacks. The bonus equals your Wisdom modifier. An enemy hit by your opportunity attack stops moving, if a move provoked the attack. If the enemy still has actions remaining, it can use them to resume moving.",
          classBonus: {
            name: "Opportunity Attacks",
            value: "Wisdom modifier",
          },
        },
        { name: "Combat Agility", type: "power" },
      ],
    },
    { name: "Combat Challenge", type: "power" },
    {
      name: "Fighter Talents",
      choices: [
        {
          name: "Arena Training",
          description:
            "You treat all weapons with which you are not proficient as improvised weapons. You gain a +2 proficiency bonus to attack rolls with improvised weapons. Your attacks with one-handed improvised weapons deal 1d8 damage, and your attacks with two-handed improvised weapons deal 1d10 damage. While you are not wearing heavy armor, you gain a +1 bonus to AC. This bonus increases to +2 at 11th level and +3 at 21st level. You select two weapons as your arena weapons. If you are not already proficient with these weapons, you gain proficiency with them. In addition, any of your feats that grant feat bonuses to attack rolls or damage rolls with one of your arena weapons apply to your other arena weapon as well.",

          classBonus: [
            {
              name: "Attack",
              value: 2,
              conditon: "not proficient",
            },
            {
              name: "AC",
              value: [1, 2, 3],
              level: [1, 11, 21],
              conditon: [
                {
                  name: "Armor",
                  equiped: false,
                  value: ["heavy armor"],
                },
              ],
            },
          ],
        },
        {
          name: "Arena Training",
          description:
            "Whenever you hit an enemy with a melee or a close attack, you gain temporary hit points equal to your Constitution modifier, plus any temporary hit points normally granted by the power. You gain the hit points only after the attack is resolved. If you use an invigorating fighter attack power and miss every target with it, you gain temporary hit points equal to your Constitution modifier.When wearing light armor or chainmail, you gain a +1 bonus to damage rolls with melee and close weapon attacks whenever you have temporary hit points. This bonus increases to +2 if you're wielding an axe, a hammer, a mace, or a pick.",

          classBonus: [
            {
              name: "Damage",
              value: 1,
              conditon: [
                {
                  name: "Armor",
                  equiped: true,
                  value: ["light armor", " chainmail"],
                },
                { name: "Temporary hit points", value: "Not zero" },
              ],
            },
            {
              name: "Damage",
              value: 1,
              conditon: [
                {
                  name: "Weapon",
                  equiped: true,
                  value: ["axe", "hammer", "mace", "pick"],
                },
                {
                  name: "Armor",
                  equiped: true,
                  value: ["light armor", " chainmail"],
                },
                { name: "Temporary hit points", value: "Not zero" },
              ],
            },
          ],
        },
        {
          name: "Brawler Style",
          classBonus: [
            {
              name: "AC",
              value: 1,
            },
            {
              name: "Fortitude",
              value: 2,
            },

            {
              name: "Attack",
              value: [2, 4, 6],
              level: [1, 11, 21],
              conditon: [
                {
                  name: "Weapon",
                  equiped: true,
                  value: ["unarmed"],
                },
              ],
            },
          ],
        },
        {
          name: "One-handed Weapon Talent",
          classBonus: [
            {
              name: "Attack",
              value: 1,
              conditon: [
                {
                  name: "Weapon",
                  equiped: true,
                  value: ["one-handed"],
                },
              ],
            },
          ],
        },
        {
          name: "Two-handed Weapon Talent",
          classBonus: [
            {
              name: "Attack",
              value: 1,
              conditon: [
                {
                  name: "Weapon",
                  equiped: true,
                  value: ["two-handed"],
                },
              ],
            },
          ],
        },
        {
          name: "Tempest Technique",
          featGained: "Two-Weapon Defense",
          classBonus: [
            {
              name: "Damage",
              value: 1,
              conditon: [
                {
                  name: "Armor",
                  equiped: true,
                  value: ["light armor", "chainmail"],
                },
              ],
            },
            {
              name: "Damage",
              value: 1,
              conditon: [
                {
                  name: "Armor",
                  equiped: true,
                  value: ["light armor", "chainmail"],
                },
                {
                  name: "Weapon",
                  equiped: true,
                  value: ["off-hand"],
                },
              ],
            },
            {
              name: "Attack",
              value: 1,
              conditon: [
                {
                  name: "Weapon",
                  equiped: true,
                  value: ["off-hand"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default async function handler(req, res) {
  try {
    let data = await fetchCollection("classes");

    data = data.map((characterClass) => {
      const regex = /<b>Bonus to Defense: <\/b>(.*)<br><br><b>Hit/;
      const regex1 = /<b>Hit Points at 1st Level<\/b>:(.*)<br><b>Hit/;
      const regex2 = />Hit Points per Level Gained<\/b>: (.*)<br><b>Healing/;
      const regex3 = /Healing Surges per Day<\/b>:(.*)<br><br><b>Trained/;
      const regex4 = /Build Options: <\/b>(.*)<br><b>Class features/;
      const regex5 = /<b>Class features: <\/b>(.*)<br><\/blockquote>/;
      const regex6 = /<b>Armor Proficiencies: <\/b>(.*)<br><b>Weapon/;
      const regex7 = /<b>Weapon Proficiencies: <\/b>(.*)<br><b>Bonus/;

      const bonusToDefense = regex.exec(characterClass.html);
      const hitpointsAtFirstLevel = regex1.exec(characterClass.html);
      const hitpointsPerLevel = regex2.exec(characterClass.html);
      const healingSurgesPerDay = regex3.exec(characterClass.html);
      const buildOptions = regex4.exec(characterClass.html);
      const classFeatures = regex5.exec(characterClass.html);
      const armorProficiencies = regex6.exec(characterClass.html);
      const weaponProficiencies = regex7.exec(characterClass.html);

      return {
        ...characterClass,
        bonusToDefense: bonusToDefense[1].trim(),
        hitpointsAtFirstLevel: hitpointsAtFirstLevel[1].trim(),
        hitpointsPerLevel: hitpointsPerLevel[1].trim(),
        healingSurgesPerDay: healingSurgesPerDay
          ? healingSurgesPerDay[1].trim()
          : "",
        buildOptions: buildOptions ? buildOptions[1].trim() : "",
        classFeatures: classFeatures ? classFeatures[1].trim() : "",
        armorProficiencies: armorProficiencies
          ? armorProficiencies[1].trim()
          : "",

        weaponProficiencies: weaponProficiencies
          ? weaponProficiencies[1].trim()
          : "",
      };
    });

    res.status(200).send(data[0]);
  } catch (e) {
    res.status(504).send(e);
  }
}
