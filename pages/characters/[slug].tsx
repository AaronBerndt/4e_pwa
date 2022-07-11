import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCharacter } from "../../hooks/useCharacters";
import { Skeleton, Stack } from "../../node_modules/@mui/material/index";
import { PowerCards } from "../../components/PowerCards";

export default function CharacterPage(props) {
  const { query } = useRouter();
  const { data: character, isLoading } = useCharacter(query.slug);
  if (isLoading) {
    return <Skeleton />;
  }

  console.log(character);
  return (
    <Stack spacing={2} style={{ padding: "15px" }}>
      <h2>CharacterName: {character.name}</h2>
      <PowerCards cards={character.powers} />
    </Stack>
  );
}
