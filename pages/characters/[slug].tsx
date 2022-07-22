import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCharacter } from "../../hooks/useCharacters";
import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Skeleton,
  Stack,
} from "../../node_modules/@mui/material/index";
import { PowerCards } from "../../components/PowerCards";
import { HealthWorkspaceModal } from "../../components/CharacterSheet/HealthWorkModal";
import {
  DefenesesSpace,
  OtherSpaces,
} from "../../components/CharacterSheet/Spaces";
import {
  GiCampfire,
  GiWingfoot,
  GiStarSwirl,
  GiMagicSwirl,
  GiBattleGear,
  GiScrollUnfurled,
} from "react-icons/gi";
import FullRestModal from "../../components/CharacterSheet/FullRestModal";
import { SkillList } from "../../components/CharacterSheet/SkillList";
import { GearView } from "../../components/CharacterSheet/GearView";
import { useState } from "react";

export default function CharacterPage(props) {
  const { query } = useRouter();
  const { data: character, isLoading } = useCharacter(query.slug);
  const [activeView, setActiveView] = useState(0);

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

      <Stack direction="row" alignItems="center" spacing={1}>
        <Button variant="contained" fullwidth>
          {character.characterState.actionPoints}
        </Button>
        <Button variant="contained">
          <GiWingfoot size="2em" />
          {character.initiative}
        </Button>
      </Stack>
      <DefenesesSpace defeneses={character.defeneses} speed={character.speed} />
      <Stack direction="row" alignItems="center" spacing={3}>
        <Button
          variant="contained"
          color={activeView === 0 ? "secondary" : "primary"}
          onClick={() => setActiveView(0)}
        >
          <GiMagicSwirl size="2em" />
        </Button>
        <Button
          variant="contained"
          color={activeView === 1 ? "secondary" : "primary"}
          onClick={() => setActiveView(1)}
        >
          <GiStarSwirl size="2em" />
        </Button>
        <Button
          variant="contained"
          color={activeView === 2 ? "secondary" : "primary"}
          onClick={() => setActiveView(2)}
        >
          <GiBattleGear size="2em" />
        </Button>
        <Button
          variant="contained"
          color={activeView === 3 ? "secondary" : "primary"}
          onClick={() => setActiveView(3)}
        >
          <GiScrollUnfurled size="2em" />
        </Button>
      </Stack>

      <Swiper
        activeIndex={1}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <PowerCards cards={character.powers} />
        </SwiperSlide>
        <SwiperSlide>
          <div>Features</div>
        </SwiperSlide>
        <SwiperSlide>
          <SkillList skills={character.skills} />
        </SwiperSlide>
        <SwiperSlide>
          <GearView gear={character.gear} />
        </SwiperSlide>
      </Swiper>
    </Stack>
  );
}
