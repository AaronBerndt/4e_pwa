import styled from "styled-components";
import { Stack } from "../../node_modules/@mui/material/index";

type DefenesesSpaceProps = {
  defeneses: {
    AC: number;
    Fortitude: number;
    Reflex: number;
    Will: number;
  };
};

type OtherSpacesProps = {
  speed: number;
  initiative: number;
  actionPoints: number;
};

type HealWorkSpaceProps = {
  hitpoints: number;
  hitpointsRemaining: number;
  temporaryHitpoints: number;
};

const Div = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  margin-right: 10px;
`;

const AttributeValue = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 27px;
  color: ${(props) => props.color};
`;
const AttributeFooter = styled.div`
  font-size: 12px;
`;

const AttributeHeader = styled.div`
  font-size: 20px;
`;

export function DefenesesSpace({ defeneses }: DefenesesSpaceProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      {Object.entries(defeneses).map(([NAME, VALUE]) => (
        <Div>
          <AttributeValue>{VALUE}</AttributeValue>
          <AttributeHeader>{NAME}</AttributeHeader>
        </Div>
      ))}
    </Stack>
  );
}

export function OtherSpaces({
  speed,
  initiative,
  actionPoints,
}: OtherSpacesProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      {Object.entries({
        speed,
        initiative,
        actionPoints,
      }).map(([NAME, VALUE]) => (
        <Div>
          <AttributeValue>{VALUE}</AttributeValue>
          <AttributeHeader>{NAME}</AttributeHeader>
        </Div>
      ))}
    </Stack>
  );
}

export function HealthWorkSpace({
  hitpointsRemaining,
  temporaryHitpoints,
  hitpoints,
}: HealWorkSpaceProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      {Object.entries({
        "Current HP": hitpointsRemaining,
        "Max HP": hitpoints,
        "Temp HP": temporaryHitpoints,
      }).map(([NAME, VALUE]) => (
        <Div>
          <AttributeValue>{VALUE}</AttributeValue>
          <AttributeHeader>{NAME}</AttributeHeader>
        </Div>
      ))}
    </Stack>
  );
}
