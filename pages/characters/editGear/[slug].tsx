import { PickGearView } from "../../../components/PickGearView";
import { CharacterBuilderProvider } from "../../../context/CharacterBuildContext";
import { useCharacter } from "../../../hooks/useCharacters";
import useEditCharacter from "../../../hooks/useEditCharacter";
import {
  Button,
  Link,
  MobileStepper,
  Skeleton,
  Stack,
} from "../../../node_modules/@mui/material/index";
import axios from "../../../node_modules/axios/index";
import { useRouter } from "../../../node_modules/next/router";

export default function EditGearPage() {
  const { query } = useRouter();
  const { data: character, isLoading } = useCharacter(query.slug);
  const { mutate: editCharacter }: any = useEditCharacter(query.slug);

  if (!query.slug || isLoading) {
    return <Skeleton />;
  }

  return (
    <Stack>
      <CharacterBuilderProvider characterData={character}>
        <PickGearView />
      </CharacterBuilderProvider>

      <MobileStepper
        variant="dots"
        style={{}}
        steps={1}
        position="bottom"
        activeStep={0}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Link href={`/characters/${character._id}`}>
            <Button size="small" onClick={() => editCharacter()}>
              Finish
            </Button>
          </Link>
        }
        backButton={
          <Link href={`/characters/${character._id}`}>
            <Button size="small">Back</Button>
          </Link>
        }
      />
    </Stack>
  );
}
