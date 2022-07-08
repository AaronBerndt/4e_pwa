import { useRef } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { Buffer } from "buffer";

type Props = {
  htmlToRender: string;
};

export function PowerCard({ htmlToRender }: Props) {
  return <div className="detail">{parse(htmlToRender)}</div>;
}
