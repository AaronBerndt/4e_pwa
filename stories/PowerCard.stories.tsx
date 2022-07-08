import React from "react";
import { PowerCard } from "../components/PowerCard";

export default {
  title: "PowerCard",
  component: PowerCard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export const Main = (args) => (
  <PowerCard
    id="<h1 class=atwillpower>Combat Challenge</h1><p class=powerstat><b>At-Will</b>        <b>Martial</b>, <b>Weapon</b><br><b>Immediate Interrupt</b>      <b>Melee 1</b> </p><p class=flavor><b>Trigger</b>: Whenever an enemy marked by you is adjacent to you and shifts or makes an attack that does not include you as a target, you can make a melee basic attack against that enemy.</p><br><p class=publishedIn>Published in Player's Handbook, page(s) 76, Class Compendium.</p>"
    {...args}
  />
);
