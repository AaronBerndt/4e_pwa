import React from "react";
import {
  CharacterAttributesForm,
  CreateCharacterForm,
  PowersForm,
} from "../components/CreateCharacterForm";
import { Form, Formik } from "../node_modules/formik/dist/index";

export default {
  title: "CreateCharacterForm",
  component: CreateCharacterForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export const Main = (args) => (
  <Formik
    initialValues={{
      name: "Tim",
      leve: "5",
      class: "Fighter",
    }}
    onSubmit={(values) => console.log(values)}
  >
    {(props) => (
      <Form>
        <CreateCharacterForm formik={props} />;
      </Form>
    )}
  </Formik>
);

export const Powers = (args) => (
  <Formik
    initialValues={{
      powers: ["62c7585216bc91a818679d32"],
      characterClass: "Fighter",
    }}
    onSubmit={(values) => console.log(values)}
  >
    {(props) => (
      <Form>
        <PowersForm formik={props} />;
      </Form>
    )}
  </Formik>
);

export const Feats = (args) => (
  <Formik
    initialValues={{
      name: "Tim",
      leve: "5",
      class: "Fighter",
    }}
    onSubmit={(values) => console.log(values)}
  >
    {(props) => (
      <Form>
        <CreateCharacterForm formik={props} />;
      </Form>
    )}
  </Formik>
);

export const CharacterAttributes = (args) => (
  <Formik
    initialValues={{
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }}
    onSubmit={(values) => console.log(values)}
  >
    {(props) => (
      <Form>
        <CharacterAttributesForm formik={props} />;
      </Form>
    )}
  </Formik>
);
