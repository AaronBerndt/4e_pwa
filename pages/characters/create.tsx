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

export default function CreateCharacterPage() {
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
                <CreateCharacterForm formik={props} />
              </SwiperSlide>
            </Swiper>
            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={activeStep}
              sx={{ maxWidth: 400, flexGrow: 1 }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === 5}
                >
                  Next
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              }
            />
          </Form>
        )}
      </Formik>
    </Grid>
  );
}
