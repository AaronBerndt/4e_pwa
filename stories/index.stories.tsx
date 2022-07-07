import React from "react";
import Home from "../pages/";

export default {
  title: "Home",
  component: Home,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export const Main = (args) => <Home />;
