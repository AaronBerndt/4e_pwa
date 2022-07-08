import React from "react";
import CharactersPage from "../pages/characters/";

export default {
  title: "CharactersPage",
  component: CharactersPage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export const Main = (args) => <CharactersPage />;
