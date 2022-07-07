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

export const Main = (args) => <PowerCard src="power11043" {...args} />;
