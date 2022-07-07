import { Card, CardContent } from "@mui/material";
import { useRef } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { powers } from "./powerJson";
import { Buffer } from "buffer";

type Props = {
  id: string;
};

export function PowerCard({ id }: Props) {
  return (
    <div className="detail">
      {parse(
        powers[id]
          .replace(/[^\x00-\x7F]/g, "")
          .replace(/[0-9]\[W\]/, "3d6")
          .replace("Strength modifier", "6")
          .replace("Dexterity modifier", "6")
          .replace("Constitution modifier", "6")
          .replace("Intelligence modifier", "6")
          .replace("Wisdom modifier", "6")
          .replace("Charisma modifier", "6")
          .replace("your Strength modifier", "6")
          .replace("your Dexterity modifier", "6")
          .replace("your Constitution modifier", "6")
          .replace("your Intelligence modifier", "6")
          .replace("your Wisdom modifier", "6")
          .replace("your Charisma modifier", "6")
          .replace("Strength", "6")
          .replace("Dexterity", "6")
          .replace("Constitution", "6")
          .replace("Intelligence", "6")
          .replace("Wisdom", "6")
          .replace("Charisma", "6")
          .replace("Charisma", "6")
      )}
    </div>
  );
}
