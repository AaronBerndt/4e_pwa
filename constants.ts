import { Skill } from "./types";

export const skillList: Skill[] = [
  { name: "Acrobatics", modifier: "dexterity", hasArmorPenality: true },
  { name: "Arcana", modifier: "intelligence", hasArmorPenality: false },
  { name: "Athletics", modifier: "strength", hasArmorPenality: true },
  { name: "Bluff", modifier: "charisma", hasArmorPenality: false },
  { name: "Diplomacy", modifier: "charisma", hasArmorPenality: false },
  { name: "Dungeoneering", modifier: "wisdom", hasArmorPenality: false },
  { name: "Endurance", modifier: "constitution", hasArmorPenality: true },
  { name: "Heal", modifier: "wisdom", hasArmorPenality: false },
  { name: "History", modifier: "intelligence", hasArmorPenality: false },
  { name: "Insight", modifier: "wisdom", hasArmorPenality: false },
  { name: "Intimidate", modifier: "charisma", hasArmorPenality: false },
  { name: "Nature", modifier: "wisdom", hasArmorPenality: false },
  { name: "Perception", modifier: "wisdom", hasArmorPenality: false },
  { name: "Religion", modifier: "intelligence", hasArmorPenality: false },
  { name: "Stealth", modifier: "dexterity", hasArmorPenality: true },
  { name: "Streetwise", modifier: "charisma", hasArmorPenality: false },
  { name: "Thievery", modifier: "dexterity", hasArmorPenality: true },
];
