import React from "react";
import CreateCharacterPage from "../pages/characters/create";

export default {
  title: "CreateCharacterPage",
  component: CreateCharacterPage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export const Main = (args) => <CreateCharacterPage />;
