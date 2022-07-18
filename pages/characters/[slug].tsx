import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCharacter } from "../../hooks/useCharacters";
import {
  Container,
  Skeleton,
  Stack,
} from "../../node_modules/@mui/material/index";
import { PowerCards } from "../../components/PowerCards";
import { HealthWorkspaceModal } from "../../components/CharacterSheet/HealthWorkModal";
import {
  DefenesesSpace,
  OtherSpaces,
} from "../../components/CharacterSheet/Spaces";

export default function CharacterPage(props) {
  const { query } = useRouter();
  const { data: character, isLoading } = useCharacter(query.slug);
  if (isLoading) {
    return <Skeleton />;
  }

  console.log(character);
  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <Stack direction="row">
        <h2>{character.name}</h2>
        <HealthWorkspaceModal
          hitpoints={character.hitpoints}
          characterState={character.characterState}
          _id={character._id}
        />
      </Stack>
      <DefenesesSpace defeneses={character.defeneses} />
      <OtherSpaces
        speed={character.speed}
        initiative={character.initiative}
        actionPoints={character.characterState.actionPoints}
      />

      <PowerCards cards={character.powers} />
    </Stack>
  );
}
