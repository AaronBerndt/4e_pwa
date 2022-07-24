import SwiperClass from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { MongoClient } from "mongodb";
import { omit } from "lodash";
import "swiper/css";
import { useRef, useState } from "react";
import { CreateCharacterForm } from "../../../components/CreateCharacterForm";
import { PickAncestryView } from "../../../components/PickAncestryView";
import { PickClassView } from "../../../components/PickClassView";
import { PickFeatsView } from "../../../components/PickFeatsView";
import { PickGearView } from "../../../components/PickGearView";
import { PickPowersView } from "../../../components/PickPowersView";
import { PickTrainedSkillsView } from "../../../components/PickTrainedSkillsView";
import { WrapupView } from "../../../components/WrapUpView";
import { CharacterBuilderProvider } from "../../../context/CharacterBuildContext";
import { useCharacterForEdit } from "../../../hooks/useCharacters";
import {
  Stack,
  Box,
  Paper,
  Typography,
  MobileStepper,
  Button,
  Skeleton,
} from "../../../node_modules/@mui/material/index";
import { useRouter } from "../../../node_modules/next/router";
import { fetchCollection } from "../../../utils/mongoUtils";
import { CharacterEditProvider } from "../../../context/CharacterEditContext";

export default function EditCharacterPage(props) {
  const { query } = useRouter();
  const slides = ["Name/Level/Class/Race", "Powers", "Feats"];
  const [activeStep, setActiveStep] = useState(0);

  const sliderRef = useRef<SwiperClass>();

  const { data: characterData, isLoading } = useCharacterForEdit(query.slug);

  const handleNext = () => {
    console.log(sliderRef);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    sliderRef.current.slideTo(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    sliderRef.current.slideTo(activeStep - 1);
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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Stack spacing={2}>
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

      <CharacterEditProvider characterData={characterData}>
        <Swiper
          ref={sliderRef}
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
            <PickAncestryView
              setActiveStep={setActiveStep}
              ancestries={props.ancestries}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PickClassView
              setActiveStep={setActiveStep}
              classes={props.classes}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PickTrainedSkillsView />
          </SwiperSlide>
          <SwiperSlide>
            <PickPowersView />
          </SwiperSlide>
          <SwiperSlide>
            <PickFeatsView
              feats={props.feats}
              ancestries={props.ancestries}
              classes={props.classes}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PickGearView />
          </SwiperSlide>
          <SwiperSlide>
            <WrapupView />
          </SwiperSlide>
        </Swiper>
      </CharacterEditProvider>
      <MobileStepper
        variant="dots"
        style={{}}
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
    </Stack>
  );
}

export async function getStaticProps(context) {
  let ancestries = await fetchCollection("ancestries");
  let feats = await fetchCollection("feats");
  let classes = await fetchCollection("classes");
  return {
    props: {
      ancestries: ancestries.map(({ _id, ...rest }) => rest),
      feats: feats.map(({ _id, ...rest }) => rest),
      classes: classes.map(({ _id, ...rest }) => rest),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}
