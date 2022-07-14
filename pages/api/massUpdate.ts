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
      choices: [{ name: "Relex" }],
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

      const bonusToDefense = regex.exec(characterClass.html);
      const hitpointsAtFirstLevel = regex1.exec(characterClass.html);
      const hitpointsPerLevel = regex2.exec(characterClass.html);
      const healingSurgesPerDay = regex3.exec(characterClass.html);
      const buildOptions = regex4.exec(characterClass.html);
      const classFeatures = regex5.exec(characterClass.html);

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
      };
    });

    res.status(200).send(data[0]);
  } catch (e) {
    res.status(504).send(e);
  }
}
