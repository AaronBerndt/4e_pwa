import { find } from "lodash";
import { Feat } from "../../types";

export default function returnFilteredFeats(
  feats: any,
  featTypeFilter: string,
  ancestry: string,
  characterClass: string,
  powers: string[],
  selectedFeats: string[],
  trainedSkills: string[],
  ancestries: any,
  classes: any
) {
  return feats
    .filter(({ tier }: Feat) => tier === featTypeFilter)
    .filter(({ prerequisite }) => prerequisite !== "")
    .filter(({ prerequisite }) => {
      const prerequisiteList = prerequisite
        .split(",")
        .map((prereq) => prereq.trim().toLowerCase());

      const ancestryObject = find(ancestries, { name: ancestry }) || {
        origin: "None",
      };

      const classesObject = find(classes, { name: characterClass }) || {
        role: "None",
        powerSource: "None",
      };

      return prerequisiteList.every((prereq) => {
        return [
          characterClass.toLowerCase(),
          ancestry.toLowerCase(),
          ancestryObject?.origin.toLowerCase(),
          classesObject?.powerSource.toLowerCase(),
          classesObject?.role.toLowerCase(),
          ...powers.map((power: string) => power.toLowerCase()),
          ...selectedFeats.map((selectedFeat: string) =>
            selectedFeat.toLowerCase()
          ),
          ...trainedSkills.map((trainedSkill: string) =>
            trainedSkill.toLowerCase()
          ),
        ].some((choice: string) => {
          const regex = new RegExp(prereq);
          console.log(regex);
          return regex.test(choice);
        });
      });
    });
}
