import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCharacter } from "../../hooks/useCharacters";
import {
  Button,
  ButtonGroup,
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
import { GiCampfire } from "react-icons/gi";
import FullRestModal from "../../components/CharacterSheet/FullRestModal";

export default function CharacterPage(props) {
  const { query } = useRouter();
  const { data: character, isLoading } = useCharacter(query.slug);

  if (!query.slug || isLoading) {
    return <Skeleton />;
  }

  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <Stack direction="row" justifyContent="space-between">
        <h2>{character.name}</h2>

        <Stack direction="column" alignItems="center" spacing={1}>
          <HealthWorkspaceModal
            hitpoints={character.hitpoints}
            characterState={character.characterState}
            surges={character.surgesPerDay}
            _id={character._id}
          />
          <FullRestModal characterData={character} />
        </Stack>
      </Stack>
      <DefenesesSpace defeneses={character.defeneses} />
      <OtherSpaces
        speed={character.speed}
        initiative={character.initiative}
        actionPoints={character.characterState.actionPoints}
      />

      <Swiper spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>
          <PowerCards cards={character.powers} />
        </SwiperSlide>
        <SwiperSlide>
          <div>Skills</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>Gear</div>
        </SwiperSlide>
      </Swiper>
    </Stack>
  );
}
