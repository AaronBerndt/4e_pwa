import { Swiper, SwiperSlide } from "swiper/react";
import { MongoClient } from "mongodb";
import { omit } from "lodash";

import "swiper/css";
import { useState } from "react";
import { CreateCharacterForm } from "../../components/CreateCharacterForm";
import { PickAncestryView } from "../../components/PickAncestryView";
import { PickClassView } from "../../components/PickClassView";
import { PickParagonPathView } from "../../components/PickParagonPathView";
import { PickPowersView } from "../../components/PickPowersView";
import { CharacterBuilderProvider } from "../../context/CharacterBuildContext";
import {
  MobileStepper,
  Button,
  Grid,
} from "../../node_modules/@mui/material/index";
import { fetchCollection } from "../../utils/mongoUtils";
import { Feats } from "../../stories/CreateCharacterForm.stories";
import { PickFeatsView } from "../../components/PickFeatsView";
import { PickGearView } from "../../components/PickGearView";
export default function CreateCharacterPage(props) {
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
            <PickAncestryView setActiveStep={setActiveStep} />
          </SwiperSlide>
          <SwiperSlide>
            <PickClassView setActiveStep={setActiveStep} />
          </SwiperSlide>
          <SwiperSlide>
            <PickPowersView />
          </SwiperSlide>
          <SwiperSlide>
            <PickFeatsView />
          </SwiperSlide>
          <SwiperSlide>
            <PickGearView />
          </SwiperSlide>
        </Swiper>
      </CharacterBuilderProvider>
      <MobileStepper
        variant="dots"
        steps={6}
        position="bottom"
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
