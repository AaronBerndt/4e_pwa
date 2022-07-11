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
  Typography,
  Paper,
  Box,
} from "../../node_modules/@mui/material/index";
import { fetchCollection } from "../../utils/mongoUtils";
import { PickFeatsView } from "../../components/PickFeatsView";
import { PickGearView } from "../../components/PickGearView";
import { WrapupView } from "../../components/WrapUpView";
import { PickTrainedSkillsView } from "../../components/PickTrainedSkillsView";

export default function CreateCharacterPage(props) {
  const slides = ["Name/Level/Class/Race", "Powers", "Feats"];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    "Character Info",
    "Ancestry",
    "Class",
    "Trained Skills",
    "Powers",
    "Feats",
    "Gear",
    "Wrap Up",
  ];

  return (
    <Grid>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography variant="h4">{steps[activeStep]}</Typography>
        </Paper>
      </Box>

      <CharacterBuilderProvider>
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          onSlideChange={({ activeIndex }) => {
            setActiveStep(activeIndex);
            window.scrollTo(0, 0);
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
            <PickTrainedSkillsView />
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
          <SwiperSlide>
            <WrapupView />
          </SwiperSlide>
        </Swiper>
      </CharacterBuilderProvider>
      <MobileStepper
        variant="dots"
        steps={steps.length}
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
