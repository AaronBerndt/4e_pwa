import usePowers from "../../hooks/usePowers";
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  MobileStepper,
  Button,
} from "../../node_modules/@mui/material/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { CreateCharacterForm } from "../../components/CreateCharacterForm";
import { Form, Formik } from "../../node_modules/formik/dist/index";
import { fetchCollection } from "../../utils/mongoUtils";
import { omit } from "lodash";
import { PickAncestryView } from "../../components/PickAncestryView";
import "swiper/css";
import { PickClassView } from "../../components/PickClassView";
import { PickPowersView } from "../../components/PickPowersView";
import { CharacterBuilderProvider } from "../../context/CharacterBuildContext";

export default function CreateCharacterPage(stateProps) {
  const { data: powers } = usePowers();
  const slides = ["Name/Level/Class/Race", "Powers", "Feats"];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Grid>
      <CharacterBuilderProvider>
        <Swiper
          realIndex={activeStep}
          spaceBetween={15}
          ver
          slidesPerView={1}
          onSlideChange={({ previousIndex }) => {
            setActiveStep(previousIndex + 1);
          }}
        >
          <SwiperSlide>
            <CreateCharacterForm />
          </SwiperSlide>
          <SwiperSlide>
            <PickAncestryView />
          </SwiperSlide>
          <SwiperSlide>
            <PickClassView />
          </SwiperSlide>
          <SwiperSlide>
            <PickPowersView />
          </SwiperSlide>
        </Swiper>
      </CharacterBuilderProvider>
      <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
    </Grid>
  );
}

export async function getStaticProps(ctx) {
  const ancestries = await fetchCollection("ancestries");
  const classes = await fetchCollection("classes");
  const paragonPaths = await fetchCollection("paragonPaths");
  const epicDestinies = await fetchCollection("epicDestinies");
  const powers = await fetchCollection("powers", {
    class: "Fighter",
    level: "1",
  });

  return {
    props: {
      ancestries: ancestries.map((object) => omit(object, ["_id"])),
      classes: classes.map((object) => omit(object, ["_id"])),
      paragonPaths: paragonPaths.map((object) => omit(object, ["_id"])),
      epicDestinies: epicDestinies.map((object) => omit(object, ["_id"])),
    },
  };
}
